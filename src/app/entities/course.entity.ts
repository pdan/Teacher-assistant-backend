// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string

  @Column()
  teacher: string

  @Column()
  startTime?: number

  @Column()
  endTime?: number
}
