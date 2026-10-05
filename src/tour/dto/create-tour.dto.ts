import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ItineraryDayDto } from './itinerary-day.dto';

/**
 * Shape of a tour create request from the admin dashboard.
 * Every field is validated server-side (ValidationPipe strips unknown keys).
 */
export class CreateTourDto {
  @IsString()
  @MaxLength(200)
  title!: string;

  /** Lowercase, hyphenated, URL-safe. */
  @IsString()
  @MaxLength(200)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase letters, numbers and single hyphens',
  })
  slug!: string;

  @IsIn(['one-day', 'multi-day'])
  type!: 'one-day' | 'multi-day';

  @IsOptional()
  @IsString()
  @MaxLength(120)
  location?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  duration?: string;

  @IsInt()
  @Min(0)
  basePrice!: number;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  overview?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  @MaxLength(300, { each: true })
  highlights?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  @MaxLength(300, { each: true })
  included?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  @MaxLength(300, { each: true })
  excluded?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(60)
  @ValidateNested({ each: true })
  @Type(() => ItineraryDayDto)
  itinerary?: ItineraryDayDto[];

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  coverImage?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  @MaxLength(1000, { each: true })
  gallery?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
