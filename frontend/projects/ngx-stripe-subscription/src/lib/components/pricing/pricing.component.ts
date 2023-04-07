import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan/plan.service';
import { PlanPeriod } from '../../../core/enums';
import { Plan } from '../../../core/models';

@Component({
  selector: 'ngx-stripe-subscription-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  readonly PlanPeriod = PlanPeriod;
  period: PlanPeriod = PlanPeriod.MONTHLY;
  plans: Plan[] = [];
  selectedPlan: Plan | undefined;

  constructor(private planService: PlanService) {}

  ngOnInit() {
    this.getPlans();
  }

  getPlans() {
    this.planService.getPlans(this.period).subscribe((res) => {
      console.log(res);
      if (res.success && res.result) {
        console.log(res);
        this.plans = res.result;
        this.selectedPlan = this.plans[1];
      }
    });
  }
}
