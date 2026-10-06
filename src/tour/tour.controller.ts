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
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ReorderToursDto } from './dto/reorder-tours.dto';
import type { Tour } from './tour.entity';

/**
 * Admin tour CRUD. All routes require a valid admin JWT (access_token cookie).
 * Mounted under /api/tours to match the frontend same-origin proxy.
 */
@UseGuards(JwtAuthGuard)
@Controller('api/tours')
export class TourController {
  constructor(private readonly tours: TourService) {}

  @Get()
  findAll(): Promise<Tour[]> {
    return this.tours.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Tour> {
    return this.tours.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTourDto): Promise<Tour> {
    return this.tours.create(dto);
  }

  // Declared before PATCH :id so "reorder" isn't matched as a tour id.
  @Patch('reorder')
  reorder(@Body() dto: ReorderToursDto): Promise<{ ok: true }> {
    return this.tours.reorder(dto.ids);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTourDto,
  ): Promise<Tour> {
    return this.tours.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ ok: true; id: string }> {
    return this.tours.remove(id);
  }
}
