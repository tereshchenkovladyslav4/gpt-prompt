import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { NgxStripeSubscriptionModule } from 'ngx-stripe-subscription';
import { SubscriptionComponent } from '@modules/subscription/subscription.component';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [CommonModule, SubscriptionRoutingModule, NgxStripeSubscriptionModule],
})
export class SubscriptionModule {}
