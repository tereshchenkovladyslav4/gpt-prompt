import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = `${environment.apiURL}`;
  }

  public get(apiCall: string, options?: object): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiURL}?api_call=${encodeURIComponent(`/${apiCall}`)}`, options);
  }

  public post(apiCall: string, data?: object): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiURL}/${apiCall}`, data);
  }
}
