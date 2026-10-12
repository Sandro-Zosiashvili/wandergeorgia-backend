import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroImage } from './hero-image.entity';
import { HeroController } from './hero.controller';
import { HeroPublicController } from './hero-public.controller';
import { HeroService } from './hero.service';

@Module({
  imports: [TypeOrmModule.forFeature([HeroImage])],
  controllers: [HeroController, HeroPublicController],
  providers: [HeroService],
})
export class HeroModule {}
