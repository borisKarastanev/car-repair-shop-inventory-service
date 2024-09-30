import { Injectable } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Car } from 'apps/cars/src/entities/car.entity';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto, car: Car): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto, car);
  }

  async findAll(car: Car): Promise<Task[]> {
    return await this.tasksRepository.find({ car });
  }

  async findOne(id: string, car: Car): Promise<Task> {
    return await this.tasksRepository.findOne({ id, car });
  }

  async createTask(createTaskDto: CreateTaskDto, car: Car): Promise<Task> {
    return await this.tasksRepository.createTask(createTaskDto, car);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.tasksRepository.findOneAndUpdate({ id }, updateTaskDto);
  }

  async deleteTask(id: string, car: Car): Promise<void> {
    return await this.tasksRepository.findOneAndDelete({ id, car });
  }
}
