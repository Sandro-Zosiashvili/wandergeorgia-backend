import { Controller, Get, Query } from '@nestjs/common';
import { HeroService } from './hero.service';
import { localizeMany, parseLocale } from '../common/locale';
import type { HeroImage } from './hero-image.entity';

const HERO_I18N_FIELDS: (keyof HeroImage)[] = ['alt', 'place'];

/**
 * Public, unauthenticated read API for the homepage hero. Only exposes ACTIVE
 * images, in order. `?lang=ru` returns Russian (falling back to English).
 */
@Controller('api/public/hero')
export class HeroPublicController {
  constructor(private readonly hero: HeroService) {}

  @Get()
  async findAll(@Query('lang') lang?: string): Promise<HeroImage[]> {
    const list = await this.hero.findAllActive();
    return localizeMany(list, parseLocale(lang), HERO_I18N_FIELDS);
  }
}
