import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CarStatus } from '../car-status.enum';
import { User } from 'apps/authentication/src/users/entities/user.entity';
import { Exclude } from 'class-transformer';

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

  @ManyToOne(() => User, (user) => user.cars, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
