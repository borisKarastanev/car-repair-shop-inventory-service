import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('create_client')
  async create(@Payload() payload: any): Promise<Client> {
    return await this.clientsService.createClient(payload);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('fetch_all_clients')
  async findAll(): Promise<Client[]> {
    return await this.clientsService.findAllClients();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('fetch_client')
  async findOne(@Payload() payload: any): Promise<Client> {
    const { id } = payload;
    return await this.clientsService.findOneClient(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('update_client')
  async update(@Payload() payload: any): Promise<Client> {
    const { id, updateClientDto } = payload;
    return await this.clientsService.updateClient(id, updateClientDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('delete_client')
  async delete(@Payload() payload: any): Promise<void> {
    const { id } = payload;
    return await this.clientsService.deleteClient(id);
  }
}
