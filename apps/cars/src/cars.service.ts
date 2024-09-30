import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarsRepository } from './cars.repository';
import { Car } from './entities/car.entity';
import { TASKS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';
import { CreateTaskDto } from 'apps/tasks/src/dto/create-task.dto';
import { Task } from 'apps/tasks/src/entities/task.entity';
import { UpdateTaskDto } from 'apps/tasks/src/dto/update-task.dto';

@Injectable()
export class CarsService {
  constructor(
    @Inject(TASKS_SERVICE) private readonly tasksClient: ClientProxy,
    private readonly carsRepository: CarsRepository,
  ) {}
  async create(createCarDto: CreateCarDto): Promise<Car> {
    return await this.carsRepository.createCar(createCarDto);
  }

  async findAll(): Promise<Car[]> {
    return await this.carsRepository.findAll();
  }

  async findOne(id: string): Promise<Car> {
    return await this.carsRepository.findOne({ id });
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    return await this.carsRepository.findOneAndUpdate({ id }, updateCarDto);
  }

  async remove(id: string): Promise<void> {
    return await this.carsRepository.findOneAndDelete({ id });
  }

  async findAllTasksForCar(id: string) {
    try {
      const car: Car = await this.carsRepository.findOne({ id });
      return firstValueFrom(this.tasksClient.send('fetch_all_tasks', car));
    } catch (error) {
      new InternalServerErrorException();
    }
  }

  async findTaskForCar(id: string, taskId: string) {
    try {
      const car: Car = await this.carsRepository.findOne({ id });
      const payload = { taskId, car };
      return firstValueFrom(
        this.tasksClient.send('fetch_single_task', payload),
      );
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createTaskForCar(
    id: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    try {
      const car: Car = await this.carsRepository.findOne({ id });
      const payload = { createTaskDto, car };
      return firstValueFrom(this.tasksClient.send('create_task', payload));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateTaskForCar(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const payload = { taskId, updateTaskDto };
    try {
      return firstValueFrom(this.tasksClient.send('update_task', payload));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteTaskForCar(id: string, taskId: string): Promise<void> {
    const car: Car = await this.carsRepository.findOne({ id });
    const payload = { taskId, car };
    try {
      return firstValueFrom(
        this.tasksClient.send('delete_task', payload).pipe(
          defaultIfEmpty({
            message: 'Entity deleted successfully (default)',
          }),
        ),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
