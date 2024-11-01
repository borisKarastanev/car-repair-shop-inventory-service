import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@app/common/config/config.module';
import { ConfigService } from '@nestjs/config';
import {
  AUTHENTICATION_SERVICE,
  CARS_SERVICE,
  DatabaseModule,
  LoggerModule,
} from '@app/common';
import {
  ClientsModule as NestClientsModule,
  Transport,
} from '@nestjs/microservices';
import { InvoicesRepository } from './invoices.repository';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_INVOICES_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_INVOICES_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
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
      {
        name: CARS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: CARS_SERVICE,
          port: 4006,
        },
      },
    ]),
    DatabaseModule.forFeature([Invoice]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepository],
})
export class InvoicesModule {}
