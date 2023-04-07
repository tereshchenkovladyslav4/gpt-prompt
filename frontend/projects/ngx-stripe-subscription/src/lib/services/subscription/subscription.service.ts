import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services';
import { ApiResponse, Plan } from '../../../core/models';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private apiService: ApiService) {}

  requestSubscription(planId: number): Observable<ApiResponse<string>> {
    return this.apiService.post('user/subscribe', { planId: planId });
  }
}
