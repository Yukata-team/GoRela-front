import { TaskService } from './../../services/task.service';
import { FavoriteService } from './../../services/favorite.service';
import { User, Task } from './../../models/index';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public user;
  public posts;
  private user_id: string;
  public currentUserId = sessionStorage.getItem('current_user_id');

  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('current_user_id');
    this.userService.getUser(this.user_id).subscribe(
      (res) => {
      this.user = res;
      this.user.posts.forEach((post) => {
        post['favo_status'] = this.isFavo(post.favorites);
        post['favorites_length'] = post.favorites.length;
        console.log(post['favorites_length']);
      })
    });
  }

  addFavo(post){
    console.log("addFavo!");
    this.favoriteService.addFavo(post.id).subscribe(
      (res) => {
        post['favo_status'] = !post['favo_status'];
        post['favorites_length']++;
        console.log(`add=favo_status:${post.favo_status}`);
      }
    );
  }

  deleteFavo(post){
    this.favoriteService.deleteFavo(post.id).subscribe(
      (res) => {
        post['favo_status'] = !post['favo_status'];
        post['favorites_length']--;
        console.log(`delete=favo_status:${post.favo_status}`);
      }
    );
  }

  isFavo(post_favorites): boolean{
    let result: boolean = false;
    post_favorites.forEach(value => {
      if(value['user_id'] == this.currentUserId){
        result = true;
      }
    });
    return result;
  }
}
