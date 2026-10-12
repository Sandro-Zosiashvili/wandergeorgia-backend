import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Booking } from '../../booking/booking.entity';
import { Tour } from '../../tour/tour.entity';
import { Memory } from '../../memory/memory.entity';
import { Driver } from '../../driver/driver.entity';
import { HeroImage } from '../../hero/hero-image.entity';
import { PHRASES, TOURS_RU, HERO_RU, MEMORIES_RU } from './i18n-ru';

/** Translate an array of short phrases via the shared dictionary; untranslated
 *  items keep their English text (graceful, never blank). */
const mapPhrases = (items: string[]): string[] => items.map((s) => PHRASES[s] ?? s);

/**
 * Backfill Russian translations into every public row's `i18n.ru` override —
 * `npm run seed:i18n`. English stays in the base columns; the public API
 * resolves ru with an en fallback. Idempotent (re-running just refreshes ru).
 */
async function run(): Promise<void> {
  dotenv.config();

  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [User, Booking, Tour, Memory, Driver, HeroImage],
    synchronize: true, // ensure the i18n columns exist
  });

  await dataSource.initialize();
  try {
    // ── Tours ────────────────────────────────────────────────────────────────
    const tourRepo = dataSource.getRepository(Tour);
    const tours = await tourRepo.find();
    let tourCount = 0;
    for (const t of tours) {
      const ru = TOURS_RU[t.slug];
      if (!ru) {
        console.log(`  • tour ${t.slug}: no RU entry — left to EN fallback`);
        continue;
      }
      t.i18n = {
        ...(t.i18n ?? {}),
        ru: {
          title: ru.title,
          location: ru.location,
          duration: ru.duration,
          overview: ru.overview,
          highlights: mapPhrases(t.highlights ?? []),
          included: mapPhrases(t.included ?? []),
          excluded: mapPhrases(t.excluded ?? []),
          // itinerary is left to the EN fallback; translate it in the admin.
        },
      };
      await tourRepo.save(t);
      tourCount += 1;
      console.log(`  ✓ tour ${t.slug}`);
    }

    // ── Memories ─────────────────────────────────────────────────────────────
    const memRepo = dataSource.getRepository(Memory);
    const memories = await memRepo.find();
    let memCount = 0;
    for (const m of memories) {
      const ru = MEMORIES_RU[m.tourTitle];
      if (!ru) continue;
      m.i18n = { ...(m.i18n ?? {}), ru: { tourTitle: ru.tourTitle, caption: ru.caption } };
      await memRepo.save(m);
      memCount += 1;
      console.log(`  ✓ memory ${m.tourTitle}`);
    }

    // ── Hero ─────────────────────────────────────────────────────────────────
    const heroRepo = dataSource.getRepository(HeroImage);
    const hero = await heroRepo.find();
    let heroCount = 0;
    for (const h of hero) {
      const ru = HERO_RU[h.place];
      if (!ru) continue;
      h.i18n = { ...(h.i18n ?? {}), ru: { place: ru.place, alt: ru.alt } };
      await heroRepo.save(h);
      heroCount += 1;
      console.log(`  ✓ hero ${h.place}`);
    }

    console.log(`\n✅ Done — ${tourCount} tours, ${memCount} memories, ${heroCount} hero images translated.`);
  } finally {
    await dataSource.destroy();
  }
}

run().catch((err) => {
  console.error('✖ i18n backfill failed:', err);
  process.exit(1);
});
