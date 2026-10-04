import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    // Loads .env and makes ConfigService available everywhere.
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    BookingModule,
  ],
})
export class AppModule {}
