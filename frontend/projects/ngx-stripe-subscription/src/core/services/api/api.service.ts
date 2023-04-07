import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models';
import {
  NGX_STRIPE_SUBSCRIPTION_CONFIG,
  NgxStripeSubscriptionConfig,
} from '../../../lib/ngx-stripe-subscription.config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL: string = this.config.apiURL;

  constructor(
    private http: HttpClient,
    @Inject(NGX_STRIPE_SUBSCRIPTION_CONFIG) private config: NgxStripeSubscriptionConfig,
  ) {}

  public get(apiCall: string, params?: object, options?: object): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiURL}/${apiCall}?${this.serializeParams(params)}`, options);
  }

  public post(apiCall: string, data?: object): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiURL}/${apiCall}`, data);
  }

  protected serializeParams(obj: object | undefined): string {
    if (!obj) {
      return '';
    }
    const str: string[] = [];
    Object.entries(obj).forEach(([key, val]) => {
      if (
        obj.hasOwnProperty(key) &&
        val !== null &&
        val !== undefined &&
        val !== '' &&
        !(Array.isArray(val) && !val?.length)
      ) {
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(Array.isArray(val) ? val?.join(',') : val)}`);
      }
    });
    return str.join('&');
  }
}
