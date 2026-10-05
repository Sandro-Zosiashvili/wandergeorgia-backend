import { IsString, MaxLength } from 'class-validator';

/** One day of a tour itinerary — title + description. */
export class ItineraryDayDto {
  @IsString()
  @MaxLength(200)
  title!: string;

  @IsString()
  @MaxLength(4000)
  description!: string;
}
