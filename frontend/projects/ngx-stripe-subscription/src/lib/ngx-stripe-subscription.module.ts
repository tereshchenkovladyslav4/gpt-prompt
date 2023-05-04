import { ModuleWithProviders, NgModule } from '@angular/core';
import { PricingComponent } from './components/pricing/pricing.component';
import { NGX_STRIPE_SUBSCRIPTION_CONFIG, NgxStripeSubscriptionConfig } from './ngx-stripe-subscription.config';
import { PriceCardComponent } from './components/price-card/price-card.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StripeCardComponent } from './components/stripe-card/stripe-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PricingComponent, PriceCardComponent, StripeCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    MatDialogModule,
    MatIconModule,
  ],
  exports: [PricingComponent, PriceCardComponent, StripeCardComponent],
})
export class NgxStripeSubscriptionModule {
  static forRoot(config: NgxStripeSubscriptionConfig): ModuleWithProviders<NgxStripeSubscriptionModule> {
    return {
      ngModule: NgxStripeSubscriptionModule,
      providers: [{ provide: NGX_STRIPE_SUBSCRIPTION_CONFIG, useValue: config }],
    };
  }
}
