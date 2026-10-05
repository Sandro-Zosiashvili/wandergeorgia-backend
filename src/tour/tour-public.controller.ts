import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { TourService } from './tour.service';
import type { Tour } from './tour.entity';

/**
 * Public, unauthenticated read API for the website. Only exposes ACTIVE tours.
 * Mounted under /api/public/tours (the admin CRUD lives at /api/tours).
 */
@Controller('api/public/tours')
export class TourPublicController {
  constructor(private readonly tours: TourService) {}

  @Get()
  findAll(): Promise<Tour[]> {
    return this.tours.findAllActive();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string): Promise<Tour> {
    const tour = await this.tours.findActiveBySlug(slug);
    if (!tour) throw new NotFoundException(`Tour "${slug}" not found`);
    return tour;
  }
}
