import { hashPassword } from '@foal/core';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from './course.entity'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name?: string;

  @Column()
  family?: string

  @Column()
  birthDate?: number

  @Column()
  phone?: string

  @ManyToOne(type => Course)
  courses: Course


  async setPassword(password: string) {
    this.password = await hashPassword(password);
  }

}
