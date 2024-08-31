import { AbstractEntity } from '@app/common';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;
}
