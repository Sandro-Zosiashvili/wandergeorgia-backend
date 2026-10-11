import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Memory } from './memory.entity';
import type { CreateMemoryDto } from './dto/create-memory.dto';
import type { UpdateMemoryDto } from './dto/update-memory.dto';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory) private readonly memories: Repository<Memory>,
  ) {}

  /** All memories, in admin sort order. */
  findAll(): Promise<Memory[]> {
    return this.memories.find({ order: { orderIndex: 'ASC', createdAt: 'DESC' } });
  }

  /** Active memories only, in sort order — for the public website. */
  findAllActive(): Promise<Memory[]> {
    return this.memories.find({
      where: { isActive: true },
      order: { orderIndex: 'ASC', createdAt: 'DESC' },
    });
  }

  /** A single memory by id, or 404. */
  async findOne(id: string): Promise<Memory> {
    const memory = await this.memories.findOne({ where: { id } });
    if (!memory) throw new NotFoundException(`Memory ${id} not found`);
    return memory;
  }

  /** Create a memory. */
  create(dto: CreateMemoryDto): Promise<Memory> {
    const memory = this.memories.create(dto);
    return this.memories.save(memory);
  }

  /** Update a memory. 404 if it doesn't exist. */
  async update(id: string, dto: UpdateMemoryDto): Promise<Memory> {
    const memory = await this.findOne(id);
    Object.assign(memory, dto);
    return this.memories.save(memory);
  }

  /** Hard-delete a memory. 404 if it doesn't exist. */
  async remove(id: string): Promise<{ ok: true; id: string }> {
    const result = await this.memories.delete({ id });
    if (!result.affected) throw new NotFoundException(`Memory ${id} not found`);
    return { ok: true, id };
  }
}
