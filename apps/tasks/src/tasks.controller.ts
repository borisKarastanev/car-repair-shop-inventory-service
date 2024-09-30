import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Task } from './entities/task.entity';
import { Car } from 'apps/cars/src/entities/car.entity';

@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('fetch_all_tasks')
  async fetchAll(@Payload() car: Car): Promise<Task[]> {
    return await this.tasksService.findAll(car);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('fetch_single_task')
  async fetchOne(@Payload() payload: any): Promise<Task> {
    const { taskId, car } = payload;
    return await this.tasksService.findOne(taskId, car);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('create_task')
  async create(@Payload() payload: any): Promise<Task> {
    const { createTaskDto, car } = payload;
    return await this.tasksService.createTask(createTaskDto, car);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('update_task')
  async update(@Payload() payload: any): Promise<Task> {
    const { taskId, updateTaskDto } = payload;
    return await this.tasksService.updateTask(taskId, updateTaskDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('delete_task')
  async delete(@Payload() payload: any): Promise<void> {
    const { taskId, car } = payload;
    return await this.tasksService.deleteTask(taskId, car);
  }
}
