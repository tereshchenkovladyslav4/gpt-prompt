import { BillingMethod, Subscription } from 'ngx-stripe-subscription';

export interface UserInfo {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  active: boolean;
  subscription: Subscription;
  billingMethod: BillingMethod;
}
