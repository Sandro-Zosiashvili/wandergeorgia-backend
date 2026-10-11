import 'reflect-metadata';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Booking } from '../../booking/booking.entity';
import { Tour } from '../../tour/tour.entity';
import { Memory } from '../../memory/memory.entity';
import { Driver } from '../../driver/driver.entity';

interface SeedDriver {
  name: string;
  phone: string;
  photo: string;
  bio: string;
  vehicleModel: string;
  plate: string;
  capacity: number;
  status: 'ACTIVE' | 'ON_TOUR' | 'INACTIVE';
  orderIndex: number;
  isActive: boolean;
}

/**
 * Idempotent drivers seeder — `npm run seed:drivers`.
 *
 * Inserts the team roster from drivers-data.json, matched by `name` so re-runs
 * never duplicate. Tour assignments are left to the admin. Pass
 * SEED_DRIVERS_OVERWRITE=true to refresh matching rows from the seed file.
 */
async function run(): Promise<void> {
  dotenv.config();

  const overwrite = process.env.SEED_DRIVERS_OVERWRITE === 'true';
  const file = join(__dirname, 'drivers-data.json');
  const seed = JSON.parse(readFileSync(file, 'utf-8')) as SeedDriver[];
  console.log(`→ Loaded ${seed.length} drivers from drivers-data.json`);

  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [User, Booking, Tour, Memory, Driver],
    synchronize: true,
  });

  await dataSource.initialize();
  const drivers = dataSource.getRepository(Driver);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  try {
    for (const d of seed) {
      const existing = await drivers.findOne({ where: { name: d.name } });
      if (existing) {
        if (overwrite) {
          await drivers.save({ ...existing, ...d });
          updated += 1;
          console.log(`  ↻ updated  ${d.name}`);
        } else {
          skipped += 1;
          console.log(`  • skipped  ${d.name} (already exists)`);
        }
        continue;
      }
      await drivers.save(drivers.create(d));
      created += 1;
      console.log(`  ✓ created  ${d.name}`);
    }
    console.log(`\n✅ Done — ${created} created, ${updated} updated, ${skipped} skipped (${seed.length} total).`);
  } finally {
    await dataSource.destroy();
  }
}

run().catch((err) => {
  console.error('✖ Drivers seed failed:', err);
  process.exit(1);
});
