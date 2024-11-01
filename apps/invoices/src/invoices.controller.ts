import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Invoice } from './entities/invoice.entity';

@Controller()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('create_invoice')
  async create(@Payload() payload: any): Promise<Invoice> {
    return await this.invoicesService.createInvoice(payload);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('fetch_all_invoices')
  async findAll(@Payload() payload: any): Promise<any> {
    const { user } = payload;
    return await this.invoicesService.findAllInvoices(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('fetch_invoice')
  async findOne(@Payload() payload: any): Promise<any> {
    const { id, user } = payload;
    return await this.invoicesService.findOneInvoice(id, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('fetch_all_invoices_for_client')
  async findAllInvoicesForClient(@Payload() payload: any): Promise<any> {
    const { clientId, user } = payload;
    return await this.invoicesService.findAllInvoicesForClient(clientId, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('update_invoice')
  async findOneAndUpdate(@Payload() payload: any): Promise<any> {
    const { id, updateInvoiceDto } = payload;
    return await this.invoicesService.findOneInvoiceAndUpdate(
      id,
      updateInvoiceDto,
    );
  }
}
