import { PlanCode, PlanPeriod } from '../../enums';

export interface Plan {
  id: number;
  code: PlanCode;
  name: string;
  description: string;
  period: PlanPeriod;
  price: number;
  active: boolean;
}
