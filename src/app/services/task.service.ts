import { tap, catchError } from 'rxjs/operators';
import { Task, Post } from './../models/index';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url = 'tasks';

  constructor(private http: HttpService, private error: ErrorService) {}

  getTasks(): Observable<Task[]> {
    return this.http.get(this.url).pipe(
      tap(() => console.log('getTasks')),
      catchError(this.error.handleError<any>('cannot getTasks'))
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post(this.url, task).pipe(
      tap(() => console.log('addTask')),
      catchError(this.error.handleError('cannot addTask'))
    );
  }

  updateTask(task: Task){
    return this.http.put(this.url, task.id, String(task.id)).pipe(
      tap(() => console.log('updateTask')),
      catchError(this.error.handleError('cannot updateTask'))
    );
  }
}
