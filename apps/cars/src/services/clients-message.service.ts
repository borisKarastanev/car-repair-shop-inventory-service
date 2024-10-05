import { CLIENTS_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateClientDto } from 'apps/clients/src/dto/create-client.dto';
import { UpdateClientDto } from 'apps/clients/src/dto/update-client.dto';
import { Client } from 'apps/clients/src/entities/client.entity';
import { defaultIfEmpty, firstValueFrom } from 'rxjs';

@Injectable()
export class ClientsMessageService {
  constructor(
    @Inject(CLIENTS_SERVICE) private readonly clientsMessageClient: ClientProxy,
  ) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    return firstValueFrom(
      this.clientsMessageClient.send('create_client', createClientDto),
    );
  }

  async findAllClients(): Promise<Client[]> {
    return firstValueFrom(
      this.clientsMessageClient.send('fetch_all_clients', {}),
    );
  }

  async findOneClient(id: string): Promise<Client> {
    const payload = { id };
    return firstValueFrom(
      this.clientsMessageClient.send('fetch_client', payload),
    );
  }

  async updateClient(
    id: string,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const payload = { id, updateClientDto };

    return firstValueFrom(
      this.clientsMessageClient.send('update_client', payload),
    );
  }

  async deleteCleint(id: string): Promise<void> {
    const payload = { id };
    return firstValueFrom(
      this.clientsMessageClient.send('delete_client', payload).pipe(
        defaultIfEmpty({
          message: 'Entity deleted successfully (default)',
        }),
      ),
    );
  }
}
