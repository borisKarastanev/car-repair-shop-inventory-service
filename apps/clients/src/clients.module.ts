import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import {
  AUTHENTICATION_SERVICE,
  DatabaseModule,
  LoggerModule,
} from '@app/common';
import { Client } from './entities/client.entity';
import { Car } from 'apps/cars/src/entities/car.entity';
import { Transport } from '@nestjs/microservices';
import { ClientsModule as NestClientsModule } from '@nestjs/microservices';
import { ClientsRepository } from './clients.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Client, Car]),
    LoggerModule,
    NestClientsModule.register([
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
  controllers: [ClientsController],
  providers: [ClientsService, ClientsRepository],
})
export class ClientsModule {}
