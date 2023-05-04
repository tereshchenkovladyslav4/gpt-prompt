import { InjectionToken } from '@angular/core';

export const NGX_STRIPE_SUBSCRIPTION_CONFIG = new InjectionToken<NgxStripeSubscriptionConfig>(
  'ngxStripeSubscriptionConfig',
);

export interface NgxStripeSubscriptionConfig {
  apiURL: string;
  STRIPE_PUBLIC_KEY: string;
}
