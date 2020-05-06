import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'comment';

  constructor(private http: HttpService, private error: ErrorService) {}

  getComments(): Observable<Comment[]> {
    return this.http.get(this.url).pipe(
      tap(() => console.log('getComments')),
      catchError(this.error.handleError<any>('cannot getComments'))
    );
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post(this.url, comment).pipe(
      tap(() => console.log('addComment')),
      catchError(this.error.handleError('cannot addComment'))
    );
  }
}
