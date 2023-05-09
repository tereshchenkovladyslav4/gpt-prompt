import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PlanCode, PlanPeriod } from '../../core/enums';
import { Subscription } from '../subscription/subscription.entity';

@Entity()
export class Plan {
  @Column('int')
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PlanCode,
    default: PlanCode.GPT_FREE,
    unique: true,
  })
  code: PlanCode;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  stripePlanId: string;

  @Column({
    type: 'enum',
    enum: PlanPeriod,
    default: PlanPeriod.MONTHLY,
  })
  period: PlanPeriod;

  @Column('int')
  price: number;

  @Column('tinyint', { default: true })
  active: boolean;

  @OneToMany(() => Subscription, (subscription) => subscription.plan)
  subscriptions: Subscription[];
}
