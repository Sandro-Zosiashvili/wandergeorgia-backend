import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

/** Ordered list of tour ids for a single category — index becomes orderIndex. */
export class ReorderToursDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  ids!: string[];
}
