import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarsRepository } from './cars.repository';
import { Car } from './entities/car.entity';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}
  async create(createCarDto: CreateCarDto): Promise<Car> {
    return await this.carsRepository.createCar(createCarDto);
  }

  async findAll() {
    return await this.carsRepository.findAll();
  }

  async findOne(id: string) {
    return await this.carsRepository.findOne({ id });
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    return await this.carsRepository.findOneAndUpdate({ id }, updateCarDto);
  }

  async remove(id: string) {
    return await this.carsRepository.findOneAndDelete({ id });
  }
}
