import { PlanPeriod, PaymentStatus, SubscriptionStatus } from '../../enums';

export interface Subscription {
  id: number;
  userId: number;
  planId: number;
  billingSchema: PlanPeriod;
  status: SubscriptionStatus;
  paymentStatus: PaymentStatus;
}
