import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {
  AUTHENTICATION_SERVICE,
  DatabaseModule,
  LoggerModule,
} from '@app/common';
import { TasksRepository } from './tasks.repository';
import { Task } from './entities/task.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Car } from 'apps/cars/src/entities/car.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Task, Car]),
    LoggerModule,
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE,
        transport: Transport.TCP,
        options: {
          host: AUTHENTICATION_SERVICE,
          port: 4002,
        },
      },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
