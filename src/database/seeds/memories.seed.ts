import 'reflect-metadata';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Booking } from '../../booking/booking.entity';
import { Tour } from '../../tour/tour.entity';
import { Memory } from '../../memory/memory.entity';

interface SeedMemory {
  type: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl: string;
  tourTitle: string;
  caption: string;
  travelerName: string;
  country: string;
  date: string;
  orderIndex: number;
  isActive: boolean;
}

/**
 * Idempotent memories seeder — `npm run seed:memories`.
 *
 * Inserts the realistic Georgia "Traveler Moments" from memories-data.json.
 * A moment is matched by (tourTitle + caption) so re-running never duplicates
 * rows and never overwrites admin edits. Pass SEED_MEMORIES_OVERWRITE=true to
 * refresh matching rows from the seed file instead of skipping them.
 */
async function run(): Promise<void> {
  dotenv.config();

  const overwrite = process.env.SEED_MEMORIES_OVERWRITE === 'true';
  const file = join(__dirname, 'memories-data.json');
  const seed = JSON.parse(readFileSync(file, 'utf-8')) as SeedMemory[];
  console.log(`→ Loaded ${seed.length} memories from memories-data.json`);

  const dataSource = new DataSource({
    type: 'postgres',
    // Prefer the direct (non-pooled) connection for schema sync / DDL.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [User, Booking, Tour, Memory],
    synchronize: true, // ensure the `memories` table exists before seeding
  });

  await dataSource.initialize();
  const memories = dataSource.getRepository(Memory);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  try {
    for (const m of seed) {
      const existing = await memories.findOne({
        where: { tourTitle: m.tourTitle, caption: m.caption },
      });
      if (existing) {
        if (overwrite) {
          await memories.save({ ...existing, ...m });
          updated += 1;
          console.log(`  ↻ updated  ${m.tourTitle} — ${m.travelerName}`);
        } else {
          skipped += 1;
          console.log(`  • skipped  ${m.tourTitle} — ${m.travelerName} (already exists)`);
        }
        continue;
      }
      await memories.save(memories.create(m));
      created += 1;
      console.log(`  ✓ created  ${m.tourTitle} — ${m.travelerName}`);
    }

    console.log(
      `\n✅ Done — ${created} created, ${updated} updated, ${skipped} skipped (${seed.length} total).`,
    );
  } finally {
    await dataSource.destroy();
  }
}

run().catch((err) => {
  console.error('✖ Memories seed failed:', err);
  process.exit(1);
});
