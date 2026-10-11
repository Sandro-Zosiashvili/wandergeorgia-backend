import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memory } from './memory.entity';
import { MemoryController } from './memory.controller';
import { MemoryPublicController } from './memory-public.controller';
import { MemoryService } from './memory.service';

@Module({
  imports: [TypeOrmModule.forFeature([Memory])],
  controllers: [MemoryController, MemoryPublicController],
  providers: [MemoryService],
})
export class MemoryModule {}
