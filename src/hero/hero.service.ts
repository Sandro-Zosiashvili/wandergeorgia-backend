import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HeroImage } from './hero-image.entity';
import type { CreateHeroImageDto } from './dto/create-hero-image.dto';
import type { UpdateHeroImageDto } from './dto/update-hero-image.dto';

@Injectable()
export class HeroService {
  constructor(
    @InjectRepository(HeroImage) private readonly hero: Repository<HeroImage>,
  ) {}

  /** All hero images, in admin sort order. */
  findAll(): Promise<HeroImage[]> {
    return this.hero.find({ order: { orderIndex: 'ASC', createdAt: 'ASC' } });
  }

  /** Active hero images, in sort order — for the public website. */
  findAllActive(): Promise<HeroImage[]> {
    return this.hero.find({
      where: { isActive: true },
      order: { orderIndex: 'ASC', createdAt: 'ASC' },
    });
  }

  /** A single hero image by id, or 404. */
  async findOne(id: string): Promise<HeroImage> {
    const image = await this.hero.findOne({ where: { id } });
    if (!image) throw new NotFoundException(`Hero image ${id} not found`);
    return image;
  }

  /** Create a hero image (appended to the end when no orderIndex is given). */
  async create(dto: CreateHeroImageDto): Promise<HeroImage> {
    const orderIndex = dto.orderIndex ?? (await this.hero.count());
    const image = this.hero.create({ ...dto, orderIndex });
    return this.hero.save(image);
  }

  /** Update a hero image. 404 if it doesn't exist. */
  async update(id: string, dto: UpdateHeroImageDto): Promise<HeroImage> {
    const image = await this.findOne(id);
    Object.assign(image, dto);
    return this.hero.save(image);
  }

  /** Hard-delete a hero image. 404 if it doesn't exist. */
  async remove(id: string): Promise<{ ok: true; id: string }> {
    const result = await this.hero.delete({ id });
    if (!result.affected) throw new NotFoundException(`Hero image ${id} not found`);
    return { ok: true, id };
  }

  /** Persist a new order: each id's position becomes its orderIndex. */
  async reorder(ids: string[]): Promise<{ ok: true }> {
    await this.hero.manager.transaction(async (em) => {
      await Promise.all(ids.map((id, index) => em.update(HeroImage, { id }, { orderIndex: index })));
    });
    return { ok: true };
  }
}
