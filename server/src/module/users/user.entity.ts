import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Template } from '../templates/template.entity';

@Entity()
export class User {
  @Column('int')
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @Column('tinyint', { default: true })
  active: boolean;

  @OneToMany(() => Template, (template) => template.user)
  templates: Template[];
}
