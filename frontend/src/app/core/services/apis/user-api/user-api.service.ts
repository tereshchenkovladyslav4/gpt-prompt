import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { ApiResponse, UserInfo } from '@models';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private apiService: ApiService) {}

  signup(data: any): Observable<ApiResponse<UserInfo>> {
    return this.apiService.post('user', data);
  }
}
