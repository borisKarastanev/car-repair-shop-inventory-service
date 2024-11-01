import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsString()
  public clientId: string;

  @IsNotEmpty()
  @IsString()
  public carId: string;

  @IsNotEmpty()
  @IsArray()
  public tasks: Record<string, any>[];

  @IsNotEmpty()
  @IsNumber()
  public totalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  public odometer: number;
}
