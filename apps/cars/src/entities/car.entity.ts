import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Column, Entity } from 'typeorm';
import { CarStatus } from '../car-status.enum';

@Entity()
export class Car extends AbstractEntity<Car> {
  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  odometer: number;

  @Column({ unique: true })
  vin: string;

  @Column({ type: 'varchar', nullable: true })
  status: CarStatus;
}
