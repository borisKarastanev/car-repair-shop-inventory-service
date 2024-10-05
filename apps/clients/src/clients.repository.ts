import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsRepository extends AbstractRepository<Client> {
  protected readonly logger: Logger = new Logger(ClientsRepository.name);

  constructor(
    @InjectRepository(Client)
    clientsRepository: Repository<Client>,
    entityManager: EntityManager,
  ) {
    super(clientsRepository, entityManager);
  }

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const client: Client = new Client(createClientDto);
    return await this.create(client);
  }
}
