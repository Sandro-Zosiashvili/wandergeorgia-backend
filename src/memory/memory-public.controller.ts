import { Controller, Get } from '@nestjs/common';
import { MemoryService } from './memory.service';
import type { Memory } from './memory.entity';

/**
 * Public, unauthenticated read API for the website. Only exposes ACTIVE
 * memories. Mounted under /api/public/memories (admin CRUD lives at
 * /api/memories).
 */
@Controller('api/public/memories')
export class MemoryPublicController {
  constructor(private readonly memories: MemoryService) {}

  @Get()
  findAll(): Promise<Memory[]> {
    return this.memories.findAllActive();
  }
}
