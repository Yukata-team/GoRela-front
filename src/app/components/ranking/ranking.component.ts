import { Router } from '@angular/router';
import { FavoriteService } from './../../services/favorite.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  public posts;
  public rankingPosts;
  public tasks;

  public currentUserId = sessionStorage.getItem('current_user_id');
  public favoStatus: boolean;

  constructor(
    private postService: PostService,
    private favoriteService: FavoriteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.rankingPosts = this.postService.getPosts();
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
    if(!this.currentUserId){
      this.router.navigate(['register']);
    }
    else{
      this.favoriteService.addFavo(post.id).subscribe(
        (res) => {
          post['favo_status'] = !post['favo_status'];
          post['favorites_length']++;
          console.log(post['favorites_length'])
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
          console.log(post['favorites_length'])
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
