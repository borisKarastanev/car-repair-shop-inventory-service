import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarsRepository } from './cars.repository';
import { Car } from './entities/car.entity';
import { User } from 'apps/authentication/src/users/entities/user.entity';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}
  async create(createCarDto: CreateCarDto, user: User): Promise<Car> {
    return await this.carsRepository.createCar(createCarDto, user);
  }

  async findAll(user: User): Promise<Car[]> {
    return await this.carsRepository.find({ user });
  }

  async findOne(id: string, user: User) {
    return await this.carsRepository.findOne({ id, user });
  }

  async update(id: string, user: User, updateCarDto: UpdateCarDto) {
    return await this.carsRepository.findOneAndUpdate(
      { id, user },
      updateCarDto,
    );
  }

  async remove(id: string, user: User) {
    return await this.carsRepository.findOneAndDelete({ id, user });
  }
}
