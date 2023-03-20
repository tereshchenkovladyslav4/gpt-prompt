import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Template {
  @Column('int')
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column({ nullable: true })
  title: string;

  @Column('text', { nullable: true })
  content: string;

  @ManyToOne(() => User, (user) => user.templates)
  user: User;
}
