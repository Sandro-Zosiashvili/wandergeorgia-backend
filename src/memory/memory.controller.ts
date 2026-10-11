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
import { MemoryService } from './memory.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import type { Memory } from './memory.entity';

/**
 * Admin memory CRUD. All routes require a valid admin JWT (access_token cookie).
 * Mounted under /api/memories to match the frontend same-origin proxy.
 */
@UseGuards(JwtAuthGuard)
@Controller('api/memories')
export class MemoryController {
  constructor(private readonly memories: MemoryService) {}

  @Get()
  findAll(): Promise<Memory[]> {
    return this.memories.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Memory> {
    return this.memories.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateMemoryDto): Promise<Memory> {
    return this.memories.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMemoryDto,
  ): Promise<Memory> {
    return this.memories.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ ok: true; id: string }> {
    return this.memories.remove(id);
  }
}
