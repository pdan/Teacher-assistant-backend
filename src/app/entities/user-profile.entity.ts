// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  surname: string

  @Column()
  email: string

  @Column()
  birthDate: number

  @Column()
  sex: string;

  @Column()
  jobTitle: string;

  @Column()
  introducedBy: string

  @Column()
  address: string

  @Column()
  secondPhone: string

  @Column()
  education: string

  @Column()
  country: string

  @Column()
  city: string

}
