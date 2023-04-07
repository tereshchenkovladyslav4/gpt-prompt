import { Component, Input } from '@angular/core';
import { Plan } from '../../../core/models';

@Component({
  selector: 'lib-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss'],
})
export class PriceCardComponent {
  @Input('plan') plan: Plan | undefined;
  @Input('selected') selected: boolean = false;
}
