import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // private apiUrl = 'http://localhost:1323';
  private apiUrl = 'http://54.225.116.229';
  private accessToken = localStorage.getItem('access_token');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
    }),
  };

  constructor(private http: HttpClient) {}

  //保存
  post<T>(url: string, body: any, id?: string): Observable<any> {
    if (id) {
      return this.http.post(
        `${this.apiUrl}/${url}/${id}`,
        body,
        this.httpOptions
      );
    } else {
      return this.http.post(`${this.apiUrl}/${url}`, body, this.httpOptions);
    }
  }

  //取得
  get<T>(url: string, id?: string): Observable<any> {
    console.log(this.httpOptions);
    if (id) {
      return this.http.get<T>(`${this.apiUrl}/${url}/${id}`, this.httpOptions);
    } else {
      return this.http.get<T>(`${this.apiUrl}/${url}`, this.httpOptions);
    }
  }

  //削除
  delete<T>(url: string, id?: string):Observable<any>{
    if (id) {
      return this.http.delete<T>(`${this.apiUrl}/${url}/${id}`, this.httpOptions);
    } else {
      return this.http.delete<T>(`${this.apiUrl}/${url}`, this.httpOptions);
    }
  }

  //更新
  put<T>(url: string, body: any, id?: string):Observable<any>{
    if (id) {
      return this.http.put<T>(`${this.apiUrl}/${url}/${id}`, body, this.httpOptions);
    } else {
      return this.http.put<T>(`${this.apiUrl}/${url}`, body, this.httpOptions);
    }
  }

  //Tokenの更新
  updateToken(access_token: string){
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer ' + access_token);
  }
}
