import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from './tour.entity';
import { TourController } from './tour.controller';
import { TourPublicController } from './tour-public.controller';
import { TourService } from './tour.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tour])],
  controllers: [TourController, TourPublicController],
  providers: [TourService],
})
export class TourModule {}
