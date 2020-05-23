import { ActivatedRoute, Router } from '@angular/router';
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
  public currentUserId = sessionStorage.getItem('current_user_id');
  public follows_length: number;
  public followers_length: number;
  public follow_status: boolean;

  
  private user_id: string;


  constructor(
    private userService: UserService,
    private favoriteService: FavoriteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.user_id = params['id'];
      console.log(this.user_id);
    });

    if(!this.user_id){
      if(!this.currentUserId){
        this.router.navigate(['register']);
      }
      else{
        this.user_id = this.currentUserId;
        console.log(this.user_id);
      }  
    }

    this.userService.getUser(this.user_id).subscribe(
      (res) => {
      this.user = res;
      this.user.posts.forEach((post) => {
        post['favo_status'] = this.isFavo(post.favorites);
        post['favorites_length'] = post.favorites.length;
        console.log(post['favorites_length']);
      });
      this.follows_length = this.user.follows.length;
      this.followers_length = this.user.followers.length;
      this.follow_status = this.isFollow();
    });
  }

  addFavo(post){
    console.log("addFavo!");
    if(!this.currentUserId){
      this.router.navigate(['register']);
    }
    else{
      this.favoriteService.addFavo(post.id).subscribe(
        (res) => {
          post['favo_status'] = !post['favo_status'];
          post['favorites_length']++;
          console.log(`add=favo_status:${post.favo_status}`);
        }
      );
    }
  }

  deleteFavo(post){
    if(!this.currentUserId){
      this.router.navigate(['register']);
    }
    else{
      this.favoriteService.deleteFavo(post.id).subscribe(
        (res) => {
          post['favo_status'] = !post['favo_status'];
          post['favorites_length']--;
          console.log(`delete=favo_status:${post.favo_status}`);
        }
      );
    }
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

  follow(){
    if(!this.currentUserId){
      this.router.navigate(['register']);
    }
    else{
      this.userService.followUser(this.user.id).subscribe((res) => {
        this.followers_length++;
        this.follow_status = !this.follow_status;
      });
    }
  }

  unfollow(){
    if(!this.currentUserId){
      this.router.navigate(['register']);
    }
    else{
      this.userService.unfollowUser(this.user.id).subscribe((res) => {
        this.followers_length--;
        this.follow_status = !this.follow_status;
      });
    }
  }

  isFollow(): boolean{
    let result: boolean = false;
    this.user.followers.forEach(value => {
      console.log(value['follow_user_id']);
      if(value['follow_user_id'] == this.currentUserId){
        result = true;
      }
    });
    return result;
  }

  isSameUser(): boolean{
    return this.currentUserId == this.user_id;
  }

  checkedTasksLength(post: any): number{
    let length: number = 0;
    post['tasks'].forEach(value => {
      if(value['is_done']) length++;
    });
    return length;
  }

  isReach(post: any): boolean{
    return post.tasks.length - this.checkedTasksLength(post) === 1;
  }

  isAchievement(post: any): boolean{
    return post.tasks.length - this.checkedTasksLength(post) === 0;
  }
}
