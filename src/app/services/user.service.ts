import { ErrorService } from './error.service';
import { HttpService } from './http.service';
import { User } from './../models/index';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'user';

  constructor(private http: HttpService, private error: ErrorService) {}

  addUser(user: User): Observable<User> {
    user.is_login = true;
    return this.http.post(this.url, user).pipe(
      tap(() => this.log('add user!!!!!')),
      catchError(this.error.handleError<any>('cannot addUser'))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.url).pipe(
      tap(() => this.log('get users!!!!!')),
      catchError(this.error.handleError<any>('cannot getUsers'))
    );
  }

  login(id: number) {
    this.http.post(this.url, { is_login: true }, id);
  }

  log(message: string) {
    console.log(message);
  }

  isExist(users: User[], newEmail: string, newPassword?: string): boolean {
    if (newPassword) {
      return users.some(
        (user) => user.email === newEmail && user.password === newPassword
      );
    } else if (!users) {
      console.log('no users!!');
    } else {
      return users.some((user) => user.email === newEmail);
    }
  }
}
