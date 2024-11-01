import { User } from 'apps/authentication/src/users/entities/user.entity';
import { Car } from 'apps/cars/src/entities/car.entity';
import { InvoiceStatus } from './invoice-status.enum';

export interface InvoiceResponse {
  invoiceId: string;
  shopOwner: User;
  totalPrice: number;
  status: InvoiceStatus;
  createdAt: Date;
  updatedAt: Date;
  car: Car;
}
