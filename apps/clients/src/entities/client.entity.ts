import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Car } from 'apps/cars/src/entities/car.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Client extends AbstractEntity<Client> {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  userEmail: string;

  @OneToMany(() => Car, (car) => car.client, { eager: false })
  cars: Car[];
}
