import { ModuleWithProviders, NgModule } from '@angular/core';
import { PricingComponent } from './components/pricing/pricing.component';
import { NGX_STRIPE_SUBSCRIPTION_CONFIG, NgxStripeSubscriptionConfig } from './ngx-stripe-subscription.config';
import { PriceCardComponent } from './components/price-card/price-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [PricingComponent, PriceCardComponent],
  imports: [CommonModule, FormsModule, MatButtonModule, MatButtonToggleModule, MatSnackBarModule],
  exports: [PricingComponent, PriceCardComponent],
})
export class NgxStripeSubscriptionModule {
  static forRoot(config: NgxStripeSubscriptionConfig): ModuleWithProviders<NgxStripeSubscriptionModule> {
    return {
      ngModule: NgxStripeSubscriptionModule,
      providers: [{ provide: NGX_STRIPE_SUBSCRIPTION_CONFIG, useValue: config }],
    };
  }
}
