import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthenticationGuard } from '@app/common/authentication';
import { AuthenticatedUser } from '@app/common';
import { User } from 'apps/authentication/src/users/entities/user.entity';
import { Car } from './entities/car.entity';

@Controller('cars')
@UseGuards(JwtAuthenticationGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(
    @Body() createCarDto: CreateCarDto,
    @AuthenticatedUser() user: User,
  ): Promise<Car> {
    return this.carsService.create(createCarDto, user);
  }

  @Get()
  findAll(@AuthenticatedUser() user: User): Promise<Car[]> {
    return this.carsService.findAll(user);
  }

  @Get(':id')
  findOne(@AuthenticatedUser() user: User, @Param('id') id: string) {
    return this.carsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @AuthenticatedUser() user: User,
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carsService.update(id, user, updateCarDto);
  }

  @Delete(':id')
  remove(@AuthenticatedUser() user: User, @Param('id') id: string) {
    return this.carsService.remove(id, user);
  }
}
