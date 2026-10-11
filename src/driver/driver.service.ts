import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { Tour } from '../tour/tour.entity';
import type { CreateDriverDto } from './dto/create-driver.dto';
import type { UpdateDriverDto } from './dto/update-driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver) private readonly drivers: Repository<Driver>,
    @InjectRepository(Tour) private readonly tours: Repository<Tour>,
  ) {}

  /** All drivers with their assigned tours, in sort order (admin). */
  findAll(): Promise<Driver[]> {
    return this.drivers.find({
      relations: { tours: true },
      order: { orderIndex: 'ASC', createdAt: 'DESC' },
    });
  }

  /** Active drivers with their active tours — for the public website. */
  async findAllActive(): Promise<Driver[]> {
    const drivers = await this.drivers.find({
      where: { isActive: true },
      relations: { tours: true },
      order: { orderIndex: 'ASC', createdAt: 'DESC' },
    });
    // Only surface active tours on public driver profiles.
    for (const d of drivers) d.tours = (d.tours ?? []).filter((t) => t.isActive);
    return drivers;
  }

  /** A single driver (with tours) by id, or 404. */
  async findOne(id: string): Promise<Driver> {
    const driver = await this.drivers.findOne({ where: { id }, relations: { tours: true } });
    if (!driver) throw new NotFoundException(`Driver ${id} not found`);
    return driver;
  }

  /** Resolve tour ids to Tour entities (ignores unknown ids). */
  private async resolveTours(tourIds?: string[]): Promise<Tour[]> {
    if (!tourIds || tourIds.length === 0) return [];
    return this.tours.find({ where: { id: In(tourIds) } });
  }

  /** Create a driver, assigning any given tours. */
  async create(dto: CreateDriverDto): Promise<Driver> {
    const { tourIds, ...fields } = dto;
    const driver = this.drivers.create(fields);
    driver.tours = await this.resolveTours(tourIds);
    const saved = await this.drivers.save(driver);
    return this.findOne(saved.id);
  }

  /** Update a driver; replaces the tour assignment when `tourIds` is sent. */
  async update(id: string, dto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.findOne(id);
    const { tourIds, ...fields } = dto;
    Object.assign(driver, fields);
    if (tourIds !== undefined) {
      driver.tours = await this.resolveTours(tourIds);
    }
    await this.drivers.save(driver);
    return this.findOne(id);
  }

  /** Hard-delete a driver. 404 if it doesn't exist. */
  async remove(id: string): Promise<{ ok: true; id: string }> {
    const result = await this.drivers.delete({ id });
    if (!result.affected) throw new NotFoundException(`Driver ${id} not found`);
    return { ok: true, id };
  }
}
