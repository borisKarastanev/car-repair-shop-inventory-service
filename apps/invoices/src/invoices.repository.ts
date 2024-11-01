import { AbstractRepository } from '@app/common';
import { Invoice } from './entities/invoice.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceStatus } from './invoice-status.enum';

@Injectable()
export class InvoicesRepository extends AbstractRepository<Invoice> {
  protected readonly logger: Logger = new Logger(InvoicesRepository.name);

  constructor(
    @InjectRepository(Invoice)
    invoicesRepository: Repository<Invoice>,
    entiryManager: EntityManager,
  ) {
    super(invoicesRepository, entiryManager);
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const invoice: Invoice = new Invoice({
      ...createInvoiceDto,
      status: InvoiceStatus.NOT_PAID,
    });
    return await this.create(invoice);
  }

  private calculateTotalPrice(tasks: Record<string, any>[]): number {
    const totalPrice: number = tasks.reduce((a, b) => a + b.price, 0);
    return totalPrice;
  }
}
