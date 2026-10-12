import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HeroService } from './hero.service';
import { CreateHeroImageDto } from './dto/create-hero-image.dto';
import { UpdateHeroImageDto } from './dto/update-hero-image.dto';
import { ReorderHeroDto } from './dto/reorder-hero.dto';
import type { HeroImage } from './hero-image.entity';

/**
 * Admin hero-slideshow CRUD. All routes require a valid admin JWT. Mounted
 * under /api/hero to match the frontend same-origin proxy.
 */
@UseGuards(JwtAuthGuard)
@Controller('api/hero')
export class HeroController {
  constructor(private readonly hero: HeroService) {}

  @Get()
  findAll(): Promise<HeroImage[]> {
    return this.hero.findAll();
  }

  @Post()
  create(@Body() dto: CreateHeroImageDto): Promise<HeroImage> {
    return this.hero.create(dto);
  }

  // Declared before PATCH :id so "reorder" isn't matched as an id.
  @Patch('reorder')
  reorder(@Body() dto: ReorderHeroDto): Promise<{ ok: true }> {
    return this.hero.reorder(dto.ids);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateHeroImageDto,
  ): Promise<HeroImage> {
    return this.hero.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ ok: true; id: string }> {
    return this.hero.remove(id);
  }
}
