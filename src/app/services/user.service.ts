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
  private url = 'users';

  constructor(private http: HttpService, private error: ErrorService) {}

  addUser(user: User): Observable<any> {
    return this.http.post('signup', user).pipe(
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

  getUser(user_id: string): Observable<User> {
    return this.http.get(this.url , user_id).pipe(
      tap(() => this.log('get user!!!!!')),
      catchError(this.error.handleError<any>('cannot getUser'))
    );
  }

  login(user: User) {
    return this.http.post('login', user);
  }

  log(message: string) {
    console.log(message);
  }

  followUser(post_id: number){
    console.log("followUser");
    return this.http.post(`${this.url}/${post_id}/follow`, {post_id: post_id}).pipe(
      tap(() => this.log('follow user!!!!!')),
      catchError(this.error.handleError<any>('cannot FollowUser'))
    );
  }

  unfollowUser(post_id: number){
    return this.http.delete(`${this.url}/${post_id}/follow`).pipe(
      tap(() => this.log('unfollow user!!!!!')),
      catchError(this.error.handleError<any>('cannot UnfollowUser'))
    );
  }

  getEditUser(user_id: number): Observable<any>{
    return this.http.get(`${this.url}/${user_id}/edit`).pipe(
      tap(() => this.log('get edituser!!!!!')),
      catchError(this.error.handleError<any>('cannot getEditUser'))
    );
  }

  editUser(user: User): Observable<any>{
    return this.http.put(this.url, {name: user.name, introduction: user.introduction}, String(user.id)).pipe(
      tap(() => this.log('edit user!!!!!')),
      catchError(this.error.handleError<any>('cannot EditUser'))
    );
  }
}
