import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule, LoggerModule } from '@app/common';
import { User } from './entities/user.entity';
import { Car } from 'apps/cars/src/entities/car.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([User, Car]),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
