import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { CarsRepository } from './cars.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_SERVICE } from '@app/common/constants/services';
import { User } from 'apps/authentication/src/users/entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Car, User]),
    LoggerModule,
    ClientsModule.register([
      {
        name: AUTHENTICATION_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'authentication',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository],
})
export class CarsModule {}
