import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http:HttpService) { }

  addFavo(post_id: number){
    return this.http.post(`posts/${post_id}/favorite`, {post_id: post_id});
  }

  deleteFavo(post_id: number){
    return this.http.delete(`posts/${post_id}/favorite`);
  }
}
