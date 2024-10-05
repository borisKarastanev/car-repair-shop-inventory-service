import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  public make: string;

  @IsNotEmpty()
  @IsString()
  public model: string;

  @IsNotEmpty()
  @IsNumber()
  public odometer: number;

  @IsNotEmpty()
  @IsString()
  public vin: string;

  @IsNotEmpty()
  @IsString()
  public clientId: string;
}
