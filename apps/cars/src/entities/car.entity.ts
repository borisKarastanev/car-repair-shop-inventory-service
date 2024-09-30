import { AbstractEntity } from '@app/common/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Task } from 'apps/tasks/src/entities/task.entity';
import { EntityStatus } from '@app/common/enums/entity-status.enum';

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
}
