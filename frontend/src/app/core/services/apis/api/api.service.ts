import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Filter } from '@models';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiURL: string;
  constructor(private http: HttpClient) {
    this.apiURL = `${environment.apiURL}`;
  }

  public get(apiCall: string, filter?: Filter, options?: object): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiURL}/${apiCall}?${this.serializeParams(filter)}`, options);
  }

  public post(apiCall: string, data?: object): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiURL}/${apiCall}`, data);
  }

  protected serializeParams(obj: Filter | undefined): string {
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
