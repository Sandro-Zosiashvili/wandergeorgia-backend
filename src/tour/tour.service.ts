import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Tour } from './tour.entity';
import type { CreateTourDto } from './dto/create-tour.dto';
import type { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class TourService {
  constructor(
    @InjectRepository(Tour) private readonly tours: Repository<Tour>,
  ) {}

  /** All tours, in admin sort order (admin). */
  findAll(): Promise<Tour[]> {
    return this.tours.find({ order: { orderIndex: 'ASC', createdAt: 'DESC' } });
  }

  /** Active tours only, in sort order — for the public website. */
  findAllActive(): Promise<Tour[]> {
    return this.tours.find({
      where: { isActive: true },
      order: { orderIndex: 'ASC', createdAt: 'DESC' },
    });
  }

  /** Persist a new order: each id's position becomes its orderIndex. */
  async reorder(ids: string[]): Promise<{ ok: true }> {
    await this.tours.manager.transaction(async (em) => {
      await Promise.all(ids.map((id, index) => em.update(Tour, { id }, { orderIndex: index })));
    });
    return { ok: true };
  }

  /** A single active tour by slug, or null — for the public website. */
  findActiveBySlug(slug: string): Promise<Tour | null> {
    return this.tours.findOne({ where: { slug, isActive: true } });
  }

  /** A single tour by id, or 404. */
  async findOne(id: string): Promise<Tour> {
    const tour = await this.tours.findOne({ where: { id } });
    if (!tour) throw new NotFoundException(`Tour ${id} not found`);
    return tour;
  }

  /** Create a tour. Rejects a duplicate slug with 409. */
  async create(dto: CreateTourDto): Promise<Tour> {
    await this.assertSlugFree(dto.slug);
    const tour = this.tours.create(dto);
    return this.tours.save(tour);
  }

  /** Update a tour. Rejects a slug collision with another tour. */
  async update(id: string, dto: UpdateTourDto): Promise<Tour> {
    const tour = await this.findOne(id);
    if (dto.slug && dto.slug !== tour.slug) {
      await this.assertSlugFree(dto.slug, id);
    }
    Object.assign(tour, dto);
    return this.tours.save(tour);
  }

  /** Hard-delete a tour. 404 if it doesn't exist. */
  async remove(id: string): Promise<{ ok: true; id: string }> {
    const result = await this.tours.delete({ id });
    if (!result.affected) throw new NotFoundException(`Tour ${id} not found`);
    return { ok: true, id };
  }

  /** Throw 409 if `slug` is already taken by a different tour. */
  private async assertSlugFree(slug: string, exceptId?: string): Promise<void> {
    const clash = await this.tours.findOne({
      where: exceptId ? { slug, id: Not(exceptId) } : { slug },
    });
    if (clash) throw new ConflictException(`A tour with slug "${slug}" already exists`);
  }
}
