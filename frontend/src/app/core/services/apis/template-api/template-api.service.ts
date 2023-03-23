import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { ApiResponse, Filter, Pagination, Template } from '@models';

@Injectable({
  providedIn: 'root',
})
export class TemplateApiService {
  constructor(private apiService: ApiService) {}

  saveTemplate(data: Template): Observable<ApiResponse<Template>> {
    return this.apiService.post('template', data);
  }

  getTemplates(filter: Filter): Observable<ApiResponse<Pagination<Template>>> {
    return this.apiService.get('template', filter);
  }

  getTemplate(id: number): Observable<ApiResponse<Template>> {
    return this.apiService.get(`template/${id}`);
  }
}
