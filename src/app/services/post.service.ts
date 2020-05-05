import { ErrorService } from './error.service';
import { tap, catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Post } from './../models/index';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'post';

  constructor(private http: HttpService, private error: ErrorService) {}

  getPosts(): Observable<Post[]> {
    return this.http.get(this.url).pipe(
      tap(() => console.log('getPosts')),
      catchError(this.error.handleError<any>('cannot getPosts'))
    );
  }

  getPost(id: string): Observable<Post> {
    return this.http.get(this.url, id).pipe(
      tap(() => console.log('getPost')),
      catchError(this.error.handleError<any>('cannot getPost'))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post(this.url, post).pipe(
      tap(() => console.log('addPost')),
      catchError(this.error.handleError('cannot addPost'))
    );
  }
}
