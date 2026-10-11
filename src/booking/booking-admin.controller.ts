import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingService } from './booking.service';
import { UpdateBookingDto } from './dto/update-booking.dto';
import type { Booking } from './booking.entity';

/**
 * Admin booking management. All routes require a valid admin JWT (access_token
 * cookie). Mounted under /api/bookings to match the frontend same-origin proxy.
 * (The public submission endpoint lives at POST /booking.)
 */
@UseGuards(JwtAuthGuard)
@Controller('api/bookings')
export class BookingAdminController {
  constructor(private readonly bookings: BookingService) {}

  @Get()
  findAll(): Promise<Booking[]> {
    return this.bookings.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBookingDto,
  ): Promise<Booking> {
    return this.bookings.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ ok: true; id: string }> {
    return this.bookings.remove(id);
  }
}
