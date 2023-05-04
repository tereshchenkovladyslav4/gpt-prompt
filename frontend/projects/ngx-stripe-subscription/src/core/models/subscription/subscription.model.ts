import { PlanPeriod, PaymentStatus, SubscriptionStatus } from '../../enums';
import { BillingMethod } from '../billing-method/billing-method.model';

export interface Subscription {
  id: number;
  userId: number;
  planId: number;
  billingSchema: PlanPeriod;
  status: SubscriptionStatus;
  paymentStatus: PaymentStatus;
  billingMethod: BillingMethod;
}
