/** Supported content locales. English is the authoritative base (stored in the
 *  entity's own columns); other locales live in the `i18n` JSONB override. */
export type Locale = 'en' | 'ru';

export const LOCALES: Locale[] = ['en', 'ru'];

/** Parse an untrusted `?lang=` value, defaulting to English. */
export function parseLocale(value?: string | null): Locale {
  return value === 'ru' ? 'ru' : 'en';
}

type WithI18n = { i18n?: Record<string, Record<string, unknown>> | null };

function present(v: unknown): boolean {
  if (v === undefined || v === null || v === '') return false;
  if (Array.isArray(v) && v.length === 0) return false;
  return true;
}

/**
 * Return a shallow copy of `row` with the given localized fields overridden
 * from `row.i18n[locale]`, falling back to the base (English) value whenever a
 * translation is missing or empty. For `en`, the row is returned unchanged.
 */
export function localize<T extends WithI18n>(row: T, locale: Locale, fields: (keyof T)[]): T {
  if (locale === 'en' || !row.i18n) return row;
  const tr = row.i18n[locale];
  if (!tr) return row;

  const out = { ...row };
  for (const field of fields) {
    const value = tr[field as string];
    if (present(value)) {
      (out as Record<string, unknown>)[field as string] = value;
    }
  }
  return out;
}

/** Localize a list of rows. */
export function localizeMany<T extends WithI18n>(rows: T[], locale: Locale, fields: (keyof T)[]): T[] {
  if (locale === 'en') return rows;
  return rows.map((r) => localize(r, locale, fields));
}
