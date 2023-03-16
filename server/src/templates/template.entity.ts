import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Template {
  @Column('int')
  @PrimaryGeneratedColumn()
  id: number;
  title: string;

  @Column('text', { nullable: true })
  content: string;
}
