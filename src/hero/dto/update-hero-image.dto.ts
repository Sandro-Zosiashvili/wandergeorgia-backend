import { PartialType } from '@nestjs/mapped-types';
import { CreateHeroImageDto } from './create-hero-image.dto';

/** Every field optional — only the keys sent are updated. */
export class UpdateHeroImageDto extends PartialType(CreateHeroImageDto) {}
