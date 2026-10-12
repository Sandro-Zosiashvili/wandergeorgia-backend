import { Controller, Get, Query } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { localizeMany, parseLocale } from '../common/locale';
import type { Memory } from './memory.entity';

const MEMORY_I18N_FIELDS: (keyof Memory)[] = ['caption', 'tourTitle'];

/**
 * Public, unauthenticated read API for the website. Only exposes ACTIVE
 * memories. `?lang=ru` returns Russian (falling back to English per field).
 */
@Controller('api/public/memories')
export class MemoryPublicController {
  constructor(private readonly memories: MemoryService) {}

  @Get()
  async findAll(@Query('lang') lang?: string): Promise<Memory[]> {
    const list = await this.memories.findAllActive();
    return localizeMany(list, parseLocale(lang), MEMORY_I18N_FIELDS);
  }
}
