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
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return await this.carsService.create(createCarDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async findAll(): Promise<Car[]> {
    return await this.carsService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Car> {
    return await this.carsService.findOne(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return await this.carsService.update(id, updateCarDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.carsService.remove(id);
  }

  @MessagePattern('fetch_one_car')
  async findOneMessage(@Payload() payload: any): Promise<Car> {
    const id = payload?.carId;
    return await this.carsService.findOne(id);
  }

  @MessagePattern('fetch_all_cars')
  async findAllMessage(): Promise<Car[]> {
    return await this.carsService.findAll();
  }

  // Tasks

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id/tasks')
  async findAllTasksForCar(@Param('id') id: string) {
    return await this.carsService.findAllTasksForCar(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id/tasks/:taskId')
  async findTaskForCar(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ) {
    return await this.carsService.findTaskForCar(id, taskId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post(':id/tasks')
  async createTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return await this.carsService.createTaskForCar(id, createTaskDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id/tasks/:taskId')
  async updateTask(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.carsService.updateTaskForCar(taskId, updateTaskDto);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id/tasks/:taskId')
  async deleteTask(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ): Promise<void> {
    return await this.carsService.deleteTaskForCar(id, taskId);
  }
}
