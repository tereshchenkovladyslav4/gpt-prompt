import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class BillingMethod {
  @Column('int')
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column()
  customerId: string;

  @Column({ nullable: true })
  name: string;

  @Column('datetime', { nullable: true })
  expireAt: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  paymentMethodId: string;

  @Column({ nullable: true })
  cardCountry: string;

  @ManyToOne(() => User, (user) => user.billingMethods)
  user: User;
}
