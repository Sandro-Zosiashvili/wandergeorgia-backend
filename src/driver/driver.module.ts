import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { Tour } from '../tour/tour.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Tour])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
