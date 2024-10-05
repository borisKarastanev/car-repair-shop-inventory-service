import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { CarsRepository } from './cars.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  AUTHENTICATION_SERVICE,
  CLIENTS_SERVICE,
  TASKS_SERVICE,
} from '@app/common/constants/services';
import { User } from 'apps/authentication/src/users/entities/user.entity';
import { Task } from 'apps/tasks/src/entities/task.entity';
import { ClientsController } from './controllers/clients/clients.controller';
import { ClientsMessageService } from './services/clients-message.service';

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
      {
        name: CLIENTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: CLIENTS_SERVICE,
          port: 4004,
        },
      },
    ]),
  ],
  controllers: [CarsController, ClientsController],
  providers: [CarsService, ClientsMessageService, CarsRepository],
})
export class CarsModule {}
