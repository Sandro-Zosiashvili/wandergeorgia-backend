import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BookingStatus } from '../booking.entity';

/** Admin-editable fields on an existing booking. */
export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  adminNotes?: string;
}
