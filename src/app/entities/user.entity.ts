import { hashPassword } from '@foal/core';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import { Course } from './course.entity'
import { UserProfile } from './user-profile.entity'

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string

  @Column()
  role: string

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[]

  @OneToOne(() => UserProfile, { cascade: true })
  @JoinColumn()
  userProfile: UserProfile

  async setPassword(password: string) {
    this.password = await hashPassword(password);
  }

}

// Exporting this line is required
// when using session tokens with TypeORM.
// It will be used by `npm run makemigrations`
// to generate the SQL session table.
export { DatabaseSession } from '@foal/typeorm';
