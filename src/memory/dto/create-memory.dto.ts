import { IsBoolean, IsIn, IsInt, IsObject, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';

/**
 * Shape of a memory create request from the admin dashboard. Validated
 * server-side (ValidationPipe strips unknown keys and rejects extras).
 */
export class CreateMemoryDto {
  @IsIn(['image', 'video'])
  type!: 'image' | 'video';

  @IsString()
  @MaxLength(2000)
  mediaUrl!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  tourTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  caption?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  travelerName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  country?: string;

  /** ISO day string, e.g. 2026-09-18. */
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be in YYYY-MM-DD format' })
  date?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
  /** Per-locale text overrides, e.g. { ru: { title, overview, ... } }. */
  @IsOptional()
  @IsObject()
  i18n?: Record<string, Record<string, unknown>>;
}

