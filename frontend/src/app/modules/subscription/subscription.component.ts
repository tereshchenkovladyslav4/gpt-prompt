import { Component } from '@angular/core';
import { AuthService } from '@services';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  constructor(public authService: AuthService) {}

  handleSubscribed(token: string) {
    this.authService.setToken(token);
  }
}
