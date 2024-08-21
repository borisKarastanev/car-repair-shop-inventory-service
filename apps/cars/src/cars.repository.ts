import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsRepository extends AbstractRepository<Car> {
  protected readonly logger: Logger = new Logger();

  constructor(
    @InjectRepository(Car)
    carsRepository: Repository<Car>,
    entityManager: EntityManager,
  ) {
    super(carsRepository, entityManager);
  }

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    const { make, model, odometer, vin } = createCarDto;

    const car = new Car({
      make,
      model,
      odometer,
      vin,
    });

    return this.create(car);
  }
}
