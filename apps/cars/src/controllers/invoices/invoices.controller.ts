import { AuthenticatedUser, JwtAuthenticationGuard } from '@app/common';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InvoicesMessageService } from '../../services/invoices-message.service';
import { CreateInvoiceDto } from 'apps/invoices/src/dto/create-invoice.dto';
import { Invoice } from 'apps/invoices/src/entities/invoice.entity';
import { User } from 'apps/authentication/src/users/entities/user.entity';
import { UpdateInvoiceDto } from 'apps/invoices/src/dto/update-invoice.dto';

@Controller('invoices')
@UseGuards(JwtAuthenticationGuard)
export class InvoicesController {
  constructor(
    private readonly invoicesMessageService: InvoicesMessageService,
  ) {}

  @Post()
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @AuthenticatedUser() user: User,
  ): Promise<Invoice> {
    return await this.invoicesMessageService.createInvoice(
      createInvoiceDto,
      user,
    );
  }

  @Get()
  async findAllInvoices(@AuthenticatedUser() user: User): Promise<Invoice[]> {
    return await this.invoicesMessageService.findAllInvoices(user);
  }

  @Get(':id')
  async findOneInvoice(
    @Param('id') id: string,
    @AuthenticatedUser() user: User,
  ): Promise<Invoice> {
    return await this.invoicesMessageService.findOneInvoice(id, user);
  }

  @Patch(':id')
  async findOneInvoiceAndUpdate(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    return await this.invoicesMessageService.findOneInvoiceAndUpdate(
      id,
      updateInvoiceDto,
    );
  }
}
