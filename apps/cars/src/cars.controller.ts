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
import { Car } from './entities/car.entity';
import { CreateTaskDto } from 'apps/tasks/src/dto/create-task.dto';
import { Task } from 'apps/tasks/src/entities/task.entity';
import { UpdateTaskDto } from 'apps/tasks/src/dto/update-task.dto';

@Controller('cars')
@UseGuards(JwtAuthenticationGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return await this.carsService.create(createCarDto);
  }

  @Get()
  async findAll(): Promise<Car[]> {
    return await this.carsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car> {
    return await this.carsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return await this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.carsService.remove(id);
  }

  // Tasks

  @Get(':id/tasks')
  async findAllTasksForCar(@Param('id') id: string) {
    return await this.carsService.findAllTasksForCar(id);
  }

  @Get(':id/tasks/:taskId')
  async findTaskForCar(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.carsService.findTaskForCar(id, taskId);
  }

  @Post(':id/tasks')
  async createTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.carsService.createTaskForCar(id, createTaskDto);
  }

  @Patch(':id/tasks/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.carsService.updateTaskForCar(taskId, updateTaskDto);
  }

  @Delete(':id/tasks/:taskId')
  async deleteTask(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ): Promise<void> {
    return await this.carsService.deleteTaskForCar(id, taskId);
  }
}
