import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CarStatus } from '../car-status.enum';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsString()
  public make: string;

  @IsString()
  public model: string;

  @IsNumber()
  public odometer: number;

  @IsString()
  public vin: string;

  @IsEnum(CarStatus)
  @IsOptional()
  status: CarStatus;
}
