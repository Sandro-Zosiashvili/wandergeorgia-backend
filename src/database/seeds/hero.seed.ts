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
import { HeroImage } from '../../hero/hero-image.entity';

interface SeedHero {
  imageUrl: string;
  alt: string;
  place: string;
  orderIndex: number;
  isActive: boolean;
}

/**
 * Idempotent hero-slideshow seeder — `npm run seed:hero`.
 * Matched by `place` so re-runs never duplicate. Pass SEED_HERO_OVERWRITE=true
 * to refresh matching rows from the seed file.
 */
async function run(): Promise<void> {
  dotenv.config();

  const overwrite = process.env.SEED_HERO_OVERWRITE === 'true';
  const file = join(__dirname, 'hero-data.json');
  const seed = JSON.parse(readFileSync(file, 'utf-8')) as SeedHero[];
  console.log(`→ Loaded ${seed.length} hero images from hero-data.json`);

  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [User, Booking, Tour, Memory, Driver, HeroImage],
    synchronize: true,
  });

  await dataSource.initialize();
  const hero = dataSource.getRepository(HeroImage);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  try {
    for (const h of seed) {
      const existing = await hero.findOne({ where: { place: h.place } });
      if (existing) {
        if (overwrite) {
          await hero.save({ ...existing, ...h });
          updated += 1;
          console.log(`  ↻ updated  ${h.place}`);
        } else {
          skipped += 1;
          console.log(`  • skipped  ${h.place} (already exists)`);
        }
        continue;
      }
      await hero.save(hero.create(h));
      created += 1;
      console.log(`  ✓ created  ${h.place}`);
    }
    console.log(`\n✅ Done — ${created} created, ${updated} updated, ${skipped} skipped (${seed.length} total).`);
  } finally {
    await dataSource.destroy();
  }
}

run().catch((err) => {
  console.error('✖ Hero seed failed:', err);
  process.exit(1);
});
