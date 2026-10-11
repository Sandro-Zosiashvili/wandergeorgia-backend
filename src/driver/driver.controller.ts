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
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import type { Driver } from './driver.entity';

/**
 * Admin driver CRUD. All routes require a valid admin JWT (access_token cookie).
 * Mounted under /api/drivers to match the frontend same-origin proxy.
 */
@UseGuards(JwtAuthGuard)
@Controller('api/drivers')
export class DriverController {
  constructor(private readonly drivers: DriverService) {}

  @Get()
  findAll(): Promise<Driver[]> {
    return this.drivers.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Driver> {
    return this.drivers.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDriverDto): Promise<Driver> {
    return this.drivers.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDriverDto,
  ): Promise<Driver> {
    return this.drivers.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ ok: true; id: string }> {
    return this.drivers.remove(id);
  }
}
