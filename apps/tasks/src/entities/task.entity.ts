import { Car } from 'apps/cars/src/entities/car.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common/database/abstract.entity';
import { EntityStatus } from '@app/common/enums/entity-status.enum';

@Entity()
export class Task extends AbstractEntity<Task> {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  status: EntityStatus;

  @ManyToOne(() => Car, (car) => car.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  car: Car;
}
