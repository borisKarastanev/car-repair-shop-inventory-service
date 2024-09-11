import { AbstractRepository } from '@app/common';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { User } from 'apps/authentication/src/users/entities/user.entity';

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

  async createCar(createCarDto: CreateCarDto, user: User): Promise<Car> {
    const { make, model, odometer, vin } = createCarDto;

    const car = new Car({
      make,
      model,
      odometer,
      vin,
      user,
    });

    try {
      return await this.create(car);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Car with VIN ${car.vin} already exists!`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
