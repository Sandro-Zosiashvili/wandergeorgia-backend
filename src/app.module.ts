import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user.entity';
import { Booking } from './booking/booking.entity';
import { Tour } from './tour/tour.entity';
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { TourModule } from './tour/tour.module';

@Module({
  imports: [
    // Loads .env and makes ConfigService available everywhere.
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM → Neon PostgreSQL. SSL is required by Neon. `synchronize` keeps
    // the schema in sync with the entities; disable it with DB_SYNCHRONIZE=false
    // and use migrations for a stricter production workflow.
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.getOrThrow<string>('DATABASE_URL'),
        ssl: { rejectUnauthorized: false },
        entities: [User, Booking, Tour],
        synchronize: config.get<string>('DB_SYNCHRONIZE', 'true') !== 'false',
      }),
    }),

    AuthModule,
    BookingModule,
    TourModule,
  ],
})
export class AppModule {}
