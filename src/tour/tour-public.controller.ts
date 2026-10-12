import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { TourService } from './tour.service';
import { localize, localizeMany, parseLocale } from '../common/locale';
import type { Tour } from './tour.entity';

/** Text fields that carry a Russian translation in `i18n.ru`. */
const TOUR_I18N_FIELDS: (keyof Tour)[] = [
  'title', 'location', 'duration', 'overview',
  'highlights', 'included', 'excluded', 'itinerary',
];

/**
 * Public, unauthenticated read API for the website. Only exposes ACTIVE tours.
 * `?lang=ru` returns the Russian translation (falling back to English per
 * field); omitting it, or `?lang=en`, returns English exactly as before.
 */
@Controller('api/public/tours')
export class TourPublicController {
  constructor(private readonly tours: TourService) {}

  @Get()
  async findAll(@Query('lang') lang?: string): Promise<Tour[]> {
    const list = await this.tours.findAllActive();
    return localizeMany(list, parseLocale(lang), TOUR_I18N_FIELDS);
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string, @Query('lang') lang?: string): Promise<Tour> {
    const tour = await this.tours.findActiveBySlug(slug);
    if (!tour) throw new NotFoundException(`Tour "${slug}" not found`);
    return localize(tour, parseLocale(lang), TOUR_I18N_FIELDS);
  }
}
