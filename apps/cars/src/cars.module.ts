import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { CarsRepository } from './cars.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTHENTICATION_SERVICE,
  TASKS_SERVICE,
} from '@app/common/constants/services';
import { User } from 'apps/authentication/src/users/entities/user.entity';
import { Task } from 'apps/tasks/src/entities/task.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Car, User, Task]),
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
      {
        name: TASKS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: TASKS_SERVICE,
          port: 4003,
        },
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository],
})
export class CarsModule {}
