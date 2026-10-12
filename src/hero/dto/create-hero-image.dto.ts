import { IsBoolean, IsInt, IsObject, IsOptional, IsString, MaxLength, Min } from 'class-validator';

/** Shape of a hero image create request from the admin dashboard. */
export class CreateHeroImageDto {
  @IsString()
  @MaxLength(2000)
  imageUrl!: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  alt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  place?: string;

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

