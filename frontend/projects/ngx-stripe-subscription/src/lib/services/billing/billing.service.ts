import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services';
import { Address, ApiResponse } from 'ngx-stripe-subscription';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BillingService {
  constructor(private apiService: ApiService) {}

  getCardSetupToken(): Observable<ApiResponse<string>> {
    return this.apiService.get(`billing-method/token`);
  }

  registerUserCardPaymentMethod(paymentMethodToken: string, address: Address): Observable<ApiResponse<string>> {
    return this.apiService.post(`billing-method`, { paymentMethodToken, address });
  }
}
