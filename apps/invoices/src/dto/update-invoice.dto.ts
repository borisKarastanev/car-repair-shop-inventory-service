import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { InvoiceStatus } from '../invoice-status.enum';

export class UpdateInvoiceDto {
  @IsString()
  public clientId: string;

  @IsString()
  public carId: string;

  @IsOptional()
  @IsArray()
  public tasks: Record<string, any>[];

  @IsOptional()
  @IsNumber()
  public totalPrice: number;

  @IsOptional()
  @IsNumber()
  public odometer: number;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  public status: InvoiceStatus;
}
