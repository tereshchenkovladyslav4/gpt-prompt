import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class OpenaiApiService {
  constructor(private apiService: ApiService) {}

  getCompletion(prompt: string): Observable<ApiResponse<string>> {
    return this.apiService.post('openai/completion', { prompt: prompt });
  }
}
