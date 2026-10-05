import { ArrayMaxSize, IsArray, IsOptional, IsString, MaxLength } from 'class-validator';

/** One day of a tour itinerary — title + description + its own highlights. */
export class ItineraryDayDto {
  @IsString()
  @MaxLength(200)
  title!: string;

  @IsString()
  @MaxLength(4000)
  description!: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsString({ each: true })
  @MaxLength(300, { each: true })
  highlights?: string[];
}
