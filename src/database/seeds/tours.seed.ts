import 'reflect-metadata';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Booking } from '../../booking/booking.entity';
import { Tour } from '../../tour/tour.entity';

interface SeedTour {
  title: string;
  slug: string;
  type: 'one-day' | 'multi-day';
  location: string;
  duration: string;
  basePrice: number;
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: { title: string; description: string }[];
  coverImage: string;
  gallery: string[];
  isActive: boolean;
}

/**
 * Idempotent tours seeder — `npm run seed:tours`.
 *
 * Loads the full live catalog (exported word-for-word from the website data)
 * from tours-data.json and inserts any tour whose `slug` isn't already in the
 * database. Existing rows are LEFT UNTOUCHED — re-running never overwrites admin
 * edits or loses data. Pass SEED_TOURS_OVERWRITE=true to refresh existing rows
 * from the seed file instead of skipping them.
 */
async function run(): Promise<void> {
  dotenv.config();

  const overwrite = process.env.SEED_TOURS_OVERWRITE === 'true';
  const file = join(__dirname, 'tours-data.json');
  const seed = JSON.parse(readFileSync(file, 'utf-8')) as SeedTour[];
  console.log(`→ Loaded ${seed.length} tours from tours-data.json`);

  const dataSource = new DataSource({
    type: 'postgres',
    // Prefer the direct (non-pooled) connection for schema sync / DDL.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [User, Booking, Tour],
    synchronize: true, // ensure the `tours` table exists before seeding
  });

  await dataSource.initialize();
  const tours = dataSource.getRepository(Tour);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  try {
    for (const t of seed) {
      const existing = await tours.findOne({ where: { slug: t.slug } });
      if (existing) {
        if (overwrite) {
          await tours.save({ ...existing, ...t });
          updated += 1;
          console.log(`  ↻ updated  ${t.slug}`);
        } else {
          skipped += 1;
          console.log(`  • skipped  ${t.slug} (already exists)`);
        }
        continue;
      }
      await tours.save(tours.create(t));
      created += 1;
      console.log(`  ✓ created  ${t.slug}`);
    }

    console.log(
      `\n✅ Done — ${created} created, ${updated} updated, ${skipped} skipped (${seed.length} total).`,
    );
  } finally {
    await dataSource.destroy();
  }
}

run().catch((err) => {
  console.error('✖ Tours seed failed:', err);
  process.exit(1);
});
