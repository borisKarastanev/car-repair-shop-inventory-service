import { Injectable } from '@nestjs/common';
import { ClientsRepository } from './clients.repository';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientsRepository.createClient(createClientDto);
  }

  async findAllClients(): Promise<Client[]> {
    return await this.clientsRepository.findAll();
  }

  async findOneClient(id: string): Promise<Client> {
    return await this.clientsRepository.findOne({ id });
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    return await this.clientsRepository.findOneAndUpdate(
      { id },
      updateClientDto,
    );
  }

  async deleteClient(id: string): Promise<void> {
    return await this.clientsRepository.findOneAndDelete({ id });
  }
}
