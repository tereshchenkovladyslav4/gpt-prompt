import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Plan } from '../../../core/models';
import { PlanPeriod } from '../../../core/enums';
import { ApiService } from '../../../core/services';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private apiService: ApiService) {}

  getPlans(period: PlanPeriod): Observable<ApiResponse<Plan[]>> {
    return this.apiService.get(`plan`, { period: period });
  }
}
