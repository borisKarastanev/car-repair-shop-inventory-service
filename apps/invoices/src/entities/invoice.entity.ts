import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { InvoiceStatus } from '../invoice-status.enum';

@Entity()
export class Invoice extends AbstractEntity<Invoice> {
  @Column()
  shopownerId: string;

  @Column()
  clientId: string;

  @Column()
  carId: string;

  @Column('jsonb')
  tasks: Record<string, any>[];

  @Column()
  totalPrice: number;

  @Column()
  odometer: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  status: InvoiceStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
