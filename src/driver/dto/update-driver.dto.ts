import { PartialType } from '@nestjs/mapped-types';
import { CreateDriverDto } from './create-driver.dto';

/** Every field optional — only the keys sent are updated. */
export class UpdateDriverDto extends PartialType(CreateDriverDto) {}
