import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Task } from 'apps/tasks/src/entities/task.entity';
import { EntityStatus } from '@app/common/enums/entity-status.enum';
import { Client } from 'apps/clients/src/entities/client.entity';
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
  status: EntityStatus;

  @OneToMany(() => Task, (task) => task.car, { eager: true })
  tasks: Task[];

  @ManyToOne(() => Client, (client) => client.cars, { eager: true })
  @Exclude({ toPlainOnly: true })
  client: Client;
}
