import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarsRepository } from './cars.repository';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}
  create(createCarDto: CreateCarDto) {
    return this.carsRepository.createCar(createCarDto);
  }

  findAll() {
    return this.carsRepository.findAll();
  }

  findOne(id: string) {
    return this.carsRepository.findOne({ id });
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return this.carsRepository.findOneAndUpdate({ id }, updateCarDto);
  }

  remove(id: string) {
    return this.carsRepository.findOneAndDelete({ id });
  }
}
