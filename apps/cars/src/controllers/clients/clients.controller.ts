import { AuthenticatedUser, JwtAuthenticationGuard } from '@app/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientsMessageService } from '../../services/clients-message.service';
import { CreateClientDto } from 'apps/clients/src/dto/create-client.dto';
import { Client } from 'apps/clients/src/entities/client.entity';
import { UpdateClientDto } from 'apps/clients/src/dto/update-client.dto';
import { Car } from '../../entities/car.entity';
import { CarsService } from '../../cars.service';
import { Invoice } from 'apps/invoices/src/entities/invoice.entity';
import { InvoicesMessageService } from '../../services/invoices-message.service';
import { User } from 'apps/authentication/src/users/entities/user.entity';

@Controller('clients')
@UseGuards(JwtAuthenticationGuard)
export class ClientsController {
  constructor(
    private readonly clientsMessageService: ClientsMessageService,
    private readonly carsService: CarsService,
    private readonly invoicesMessageService: InvoicesMessageService,
  ) {}

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientsMessageService.createClient(createClientDto);
  }

  @Get()
  async findAll(): Promise<Client[]> {
    return await this.clientsMessageService.findAllClients();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return await this.clientsMessageService.findOneClient(id);
  }

  @Get(':id/cars')
  async findAllCarsForClient(@Param('id') id: string): Promise<Car[]> {
    return await this.carsService.findAllCarsForClient(id);
  }

  @Get(':id/invoices')
  async findAllInvoicesForClient(
    @Param('id') id: string,
    @AuthenticatedUser() user: User,
  ): Promise<Invoice[]> {
    return await this.invoicesMessageService.findAllInvoicesForClient(id, user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() UpdateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return await this.clientsMessageService.updateClient(id, UpdateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.clientsMessageService.deleteCleint(id);
  }
}
