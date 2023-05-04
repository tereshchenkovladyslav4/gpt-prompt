import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BillingMethod } from '../billing-method/billing-method.entity';
import { Subscription } from '../subscription/subscription.entity';
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

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToMany(() => BillingMethod, (billingMethod) => billingMethod.user)
  billingMethods: BillingMethod[];
}
