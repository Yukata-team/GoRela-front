import { FavoriteService } from './../../services/favorite.service';
import { TaskService } from './../../services/task.service';
import { Post, Favorite } from './../../models/index';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public posts;
  public tasks;

  public currentUserId = sessionStorage.getItem('current_user_id');
  public favoStatus: boolean;

  constructor(
    private postService: PostService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.postService.getPosts().subscribe((posts) => {
        this.posts = posts;
        console.log(this.posts);
        posts.forEach((post) => {
          post['favo_status'] = this.isFavo(post.favorites);
          post['favorites_length'] = post.favorites.length;
        })
      });
    }, 1000);
  }

  addFavo(post){
    console.log("addFavo!");
    this.favoriteService.addFavo(post.id).subscribe(
      (res) => {
        post['favo_status'] = !post['favo_status'];
        post['favorites_length']++;
        console.log(post['favorites_length'])
        console.log(`add=favo_status:${post.favo_status}`);
      }
    );
  }

  deleteFavo(post){
    this.favoriteService.deleteFavo(post.id).subscribe(
      (res) => {
        post['favo_status'] = !post['favo_status'];
        post['favorites_length']--;
        console.log(post['favorites_length'])
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
