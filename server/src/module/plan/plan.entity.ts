import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PlanCode } from '../../core/enums/plan/plan-code.enum';
import { PlanPeriod } from '../../core/enums/plan/plan-period.enum';

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
}
