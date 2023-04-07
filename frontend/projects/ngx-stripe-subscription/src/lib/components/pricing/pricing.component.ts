import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlanService } from '../../services/plan/plan.service';
import { PlanPeriod } from '../../../core/enums';
import { Plan, Subscription } from '../../../core/models';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ngx-stripe-subscription-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  readonly PlanPeriod = PlanPeriod;
  @Input('authenticated') authenticated: boolean = false;
  @Input('subscription') subscription: Subscription | undefined;
  @Output() onSubscribed: EventEmitter<string> = new EventEmitter<string>();
  period: PlanPeriod = PlanPeriod.MONTHLY;
  plans: Plan[] = [];

  constructor(
    private planService: PlanService,
    private subscriptionService: SubscriptionService,
    private snackBar: MatSnackBar,
    private router: Router,
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
    if (this.authenticated) {
      this.subscriptionService.requestSubscription(plan.id).subscribe((res) => {
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
}
