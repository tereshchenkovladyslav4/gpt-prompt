import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plan } from '../../../core/models';

@Component({
  selector: 'lib-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss'],
})
export class PriceCardComponent {
  @Input('plan') plan: Plan | undefined;
  @Input('selected') selected: boolean = false;
  @Output() onChangePlan: EventEmitter<Plan> = new EventEmitter<Plan>();

  handleSelectPlan(plan: Plan | undefined) {
    if (plan) this.onChangePlan.emit(plan);
  }
}
