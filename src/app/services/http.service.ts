import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:8000/api';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  post<T>(url: string, body: any, id?: number): Observable<any> {
    if (id) {
      return this.http.post(
        `${this.apiUrl}/${url}/${id}/`,
        body,
        this.httpOptions
      );
    } else {
      return this.http.post(`${this.apiUrl}/${url}/`, body, this.httpOptions);
    }
  }

  get<T>(url: string, id?: number): Observable<any> {
    if (id) {
      return this.http.get<T>(`${this.apiUrl}/${url}/${id}/`, this.httpOptions);
    } else {
      return this.http.get<T>(`${this.apiUrl}/${url}/`, this.httpOptions);
    }
  }
}
