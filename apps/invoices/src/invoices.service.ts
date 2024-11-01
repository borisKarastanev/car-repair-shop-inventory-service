import { Inject, Injectable } from '@nestjs/common';
import { InvoicesRepository } from './invoices.repository';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { User } from 'apps/authentication/src/users/entities/user.entity';
import { CARS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Car } from 'apps/cars/src/entities/car.entity';
import { InvoiceResponse } from './invoices.model';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    @Inject(CARS_SERVICE)
    private readonly carsMessageClient: ClientProxy,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return await this.invoicesRepository.createInvoice(createInvoiceDto);
  }

  async findAllInvoices(user: User): Promise<InvoiceResponse[]> {
    const invoices: Invoice[] = await this.invoicesRepository.findAll();

    const response = await Promise.all(
      invoices.map(async (invoice) => {
        const { carId, totalPrice, status, createdAt, updatedAt } = invoice;
        const car: Car = await firstValueFrom(
          this.carsMessageClient.send('fetch_one_car', { carId }),
        );
        return {
          invoiceId: invoice.id,
          shopOwner: { ...user },
          totalPrice,
          status,
          createdAt,
          updatedAt,
          car: { ...car },
        };
      }),
    );

    return response;
  }

  async findAllInvoicesForClient(
    clientId: string,
    user: User,
  ): Promise<InvoiceResponse[]> {
    const invoices: Invoice[] = await this.invoicesRepository.find({
      clientId,
    });

    const response = await Promise.all(
      invoices.map(async (invoice) => {
        const { carId, totalPrice, status, createdAt, updatedAt } = invoice;
        const car: Car = await firstValueFrom(
          this.carsMessageClient.send('fetch_one_car', { carId }),
        );
        return {
          invoiceId: invoice.id,
          shopOwner: { ...user },
          totalPrice,
          status,
          createdAt,
          updatedAt,
          car: { ...car },
        };
      }),
    );

    return response;
  }

  async findOneInvoice(id: string, user: User): Promise<InvoiceResponse> {
    const invoice: Invoice = await this.invoicesRepository.findOne({ id });
    const { carId, totalPrice, status, createdAt, updatedAt } = invoice;

    const car: Car = await firstValueFrom(
      this.carsMessageClient.send('fetch_one_car', { carId }),
    );

    const response = {
      invoiceId: id,
      shopOwner: { ...user },
      totalPrice,
      status,
      createdAt,
      updatedAt,
      car: { ...car },
    };
    return response;
  }

  async findOneInvoiceAndUpdate(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    return await this.invoicesRepository.findOneAndUpdate(
      { id },
      updateInvoiceDto,
    );
  }
}
