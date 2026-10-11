import { PartialType } from '@nestjs/mapped-types';
import { CreateMemoryDto } from './create-memory.dto';

/** Every field optional — only the keys sent are updated. */
export class UpdateMemoryDto extends PartialType(CreateMemoryDto) {}
