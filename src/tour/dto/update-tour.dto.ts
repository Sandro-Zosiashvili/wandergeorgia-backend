import { PartialType } from '@nestjs/mapped-types';
import { CreateTourDto } from './create-tour.dto';

/** Every field optional — only the keys sent are updated. */
export class UpdateTourDto extends PartialType(CreateTourDto) {}
