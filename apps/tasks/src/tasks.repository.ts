import { AbstractRepository } from '@app/common';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Car } from 'apps/cars/src/entities/car.entity';
import { EntityStatus } from '@app/common/enums/entity-status.enum';

@Injectable()
export class TasksRepository extends AbstractRepository<Task> {
  protected readonly logger: Logger = new Logger();

  constructor(
    @InjectRepository(Task) tasksRepository: Repository<Task>,
    entityManager: EntityManager,
  ) {
    super(tasksRepository, entityManager);
  }

  async createTask(createTaskDto: CreateTaskDto, car: Car): Promise<Task> {
    const { title, description, price } = createTaskDto;

    const task = new Task({
      title,
      description,
      price,
      status: EntityStatus.NOT_STARTED,
      car,
    });

    try {
      return await this.create(task);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
