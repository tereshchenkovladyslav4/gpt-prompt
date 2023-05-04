import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlanService } from '../../services/plan/plan.service';
import { Plan, Subscription } from '../../../core/models';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogType, PlanPeriod } from '../../../core/enums';
import { DialogService } from '../../../core/services';
import { StripeCardComponent } from '../stripe-card/stripe-card.component';

@Component({
  selector: 'ngx-stripe-subscription-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  readonly PlanPeriod = PlanPeriod;
  @Input('authenticated') authenticated: boolean = false;
  @Input('hasBillingMethod') hasBillingMethod: boolean = false;
  @Input('subscription') subscription: Subscription | undefined;
  @Output() onSubscribed: EventEmitter<string> = new EventEmitter<string>();
  period: PlanPeriod = PlanPeriod.MONTHLY;
  plans: Plan[] = [];
  selectedPlan: Plan | undefined;

  constructor(
    private planService: PlanService,
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogService: DialogService,
  ) {}

  ngOnInit() {
    if (this.subscription) {
      this.period = this.subscription.billingSchema;
    }
    this.getPlans();
  }

  getPlans() {
    this.planService.getPlans(this.period).subscribe((res) => {
      if (res.success && res.result) {
        this.plans = res.result;
      }
    });
  }

  handleSelectPlan(plan: Plan) {
    this.selectedPlan = plan;
    if (!this.hasBillingMethod) {
      this.addBillingMethod();
      return;
    }
    this.requestSubscription();
  }

  requestSubscription() {
    if (!this.selectedPlan) {
      this.snackBar.open('Please select the plan', 'Dismiss', { duration: 4000 });
      return;
    }
    if (this.authenticated) {
      this.subscriptionService.requestSubscription(this.selectedPlan.id).subscribe((res) => {
        if (!res.success) {
          this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
          return;
        }
        this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
        this.onSubscribed.emit(res.result);
      });
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/pricing' } });
    }
  }

  addBillingMethod() {
    this.dialogService
      .open(StripeCardComponent, {
        data: { dialogType: DialogType.STRIPE },
        width: '600px',
      })
      .afterClosed()
      .subscribe((res) => {
        this.requestSubscription();
      });
  }
}
