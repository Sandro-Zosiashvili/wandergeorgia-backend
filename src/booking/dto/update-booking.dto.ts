import { IsEnum, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { BookingStatus } from '../booking.entity';

/** Admin-editable fields on an existing booking. */
export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsIn(['UNPAID', 'DEPOSIT_PAID', 'FULL_PAID'])
  paymentStatus?: 'UNPAID' | 'DEPOSIT_PAID' | 'FULL_PAID';

  @IsOptional()
  @IsString()
  @MaxLength(120)
  driverName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  adminNotes?: string;
}
