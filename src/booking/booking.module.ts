import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingController } from './booking.controller';
import { BookingAdminController } from './booking-admin.controller';
import { BookingService } from './booking.service';
import { MailService } from './mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingController, BookingAdminController],
  providers: [BookingService, MailService],
})
export class BookingModule {}
