import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EntityStatus } from '@app/common/enums/entity-status.enum';

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsString()
  public make: string;

  @IsString()
  public model: string;

  @IsNumber()
  public odometer: number;

  @IsString()
  public vin: string;

  @IsEnum(EntityStatus)
  @IsOptional()
  public status: EntityStatus;

  @IsString()
  @IsOptional()
  public clientId: string;
}
