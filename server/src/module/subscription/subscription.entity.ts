import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PaymentStatus, PlanPeriod, SubscriptionStatus } from '../../core/enums';
import { Plan } from '../plan/plan.entity';
import { User } from '../users/user.entity';

@Entity()
export class Subscription {
  @Column('int')
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('int')
  planId: number;

  @Column('int')
  amount: number;

  @Column('int')
  vatAmount: number;

  @Column('int', { nullable: true })
  discount: number;

  @Column({
    type: 'enum',
    enum: PlanPeriod,
  })
  billingSchema: PlanPeriod;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
  })
  status: SubscriptionStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
  })
  paymentStatus: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('datetime', { nullable: true })
  paidAt: Date;

  @Column('datetime', { nullable: true })
  expiresAt: Date;

  @Column('datetime', { nullable: true })
  gracePeriodStartAt: Date;

  @Column('datetime', { nullable: true })
  cancelledAt: Date;

  @Column('datetime', { nullable: true })
  lastModifiedAt: Date;

  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @ManyToOne(() => Plan, (plan) => plan.subscriptions)
  plan: Plan;
}
