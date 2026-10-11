import { Controller, Get } from '@nestjs/common';
import { DriverService } from './driver.service';
import type { Driver } from './driver.entity';

/**
 * Public, unauthenticated read API for the website. Only exposes ACTIVE drivers
 * with their ACTIVE assigned tours. Mounted under /api/public/drivers.
 */
@Controller('api/public/drivers')
export class DriverPublicController {
  constructor(private readonly drivers: DriverService) {}

  @Get()
  findAll(): Promise<Driver[]> {
    return this.drivers.findAllActive();
  }
}
