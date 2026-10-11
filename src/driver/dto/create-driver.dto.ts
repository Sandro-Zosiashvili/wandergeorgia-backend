import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/** Shape of a driver create request from the admin dashboard. */
export class CreateDriverDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  photo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  vehicleModel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  plate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  capacity?: number;

  @IsOptional()
  @IsIn(['ACTIVE', 'ON_TOUR', 'INACTIVE'])
  status?: 'ACTIVE' | 'ON_TOUR' | 'INACTIVE';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  /** Tour ids this driver is assigned to. */
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(100)
  @IsUUID('4', { each: true })
  tourIds?: string[];
}
