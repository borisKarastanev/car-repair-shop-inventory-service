import { AbstractEntity } from '@app/common';
import { Car } from 'apps/cars/src/entities/car.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Car, (car) => car.user, { eager: true })
  @Exclude()
  cars: Car[];
}
