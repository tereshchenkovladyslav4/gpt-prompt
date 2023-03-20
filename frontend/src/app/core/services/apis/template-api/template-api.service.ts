import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { ApiResponse, Template } from '@models';

@Injectable({
  providedIn: 'root',
})
export class TemplateApiService {
  constructor(private apiService: ApiService) {}

  createTemplate(data: Template): Observable<ApiResponse<Template>> {
    return this.apiService.post('template', data);
  }
}
