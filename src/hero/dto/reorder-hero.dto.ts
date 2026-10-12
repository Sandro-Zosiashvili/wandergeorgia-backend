import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

/** New order for the hero images — ids in their intended sequence. */
export class ReorderHeroDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  ids!: string[];
}
