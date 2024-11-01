import { INVOICES_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'apps/authentication/src/users/entities/user.entity';
import { CreateInvoiceDto } from 'apps/invoices/src/dto/create-invoice.dto';
import { UpdateInvoiceDto } from 'apps/invoices/src/dto/update-invoice.dto';
import { Invoice } from 'apps/invoices/src/entities/invoice.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InvoicesMessageService {
  constructor(
    @Inject(INVOICES_SERVICE)
    private readonly invoicesMessageClient: ClientProxy,
  ) {}

  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    user: User,
  ): Promise<Invoice> {
    return firstValueFrom(
      this.invoicesMessageClient.send('create_invoice', {
        ...createInvoiceDto,
        shopownerId: user.id,
      }),
    );
  }

  async findAllInvoices(user: User): Promise<Invoice[]> {
    const payload = { user };
    return firstValueFrom(
      this.invoicesMessageClient.send('fetch_all_invoices', payload),
    );
  }

  async findAllInvoicesForClient(
    clientId: string,
    user: User,
  ): Promise<Invoice[]> {
    const payload = { clientId, user };
    return firstValueFrom(
      this.invoicesMessageClient.send('fetch_all_invoices_for_client', payload),
    );
  }

  async findOneInvoice(id: string, user: User): Promise<Invoice> {
    const payload = { id, user };
    return firstValueFrom(
      this.invoicesMessageClient.send('fetch_invoice', payload),
    );
  }

  async findOneInvoiceAndUpdate(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    const payload = { id, updateInvoiceDto };
    return firstValueFrom(
      this.invoicesMessageClient.send('update_invoice', payload),
    );
  }
}
