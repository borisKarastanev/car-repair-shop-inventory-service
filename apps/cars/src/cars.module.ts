import { Module } from '@nestjs/common';
import { DatabaseModule, LoggerModule } from '@app/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './entities/car.entity';
import { CarsRepository } from './cars.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Car]), LoggerModule],
  controllers: [CarsController],
  providers: [CarsService, CarsRepository],
})
export class CarsModule {}
