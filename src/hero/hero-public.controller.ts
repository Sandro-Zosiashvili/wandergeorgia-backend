import { Controller, Get } from '@nestjs/common';
import { HeroService } from './hero.service';
import type { HeroImage } from './hero-image.entity';

/**
 * Public, unauthenticated read API for the homepage hero. Only exposes ACTIVE
 * images, in order. Mounted under /api/public/hero.
 */
@Controller('api/public/hero')
export class HeroPublicController {
  constructor(private readonly hero: HeroService) {}

  @Get()
  findAll(): Promise<HeroImage[]> {
    return this.hero.findAllActive();
  }
}
