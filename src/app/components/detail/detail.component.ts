import { FavoriteService } from './../../services/favorite.service';
import { TaskService } from './../../services/task.service';
import { Post, Task, Favorite } from './../../models/index';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  private id: string;
  public post: any;
  public tasks: Task[];
  public favoStatus: boolean;

  public currentUserId = localStorage.getItem('current_user_id');

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private taskService: TaskService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.postService.getPost(this.id).subscribe((post) => {
      this.post = post;
      console.log(post);
      post['favo_status'] = this.isFavo(post.favorites);
    });
  }

  check(task: Task){
    task.is_done = true;
    this.taskService.updateTask(task).subscribe();
  }

  uncheck(task: Task){
    task.is_done = false;
    this.taskService.updateTask(task).subscribe();
  }

  addFavo(post){
    this.favoriteService.addFavo(post.id).subscribe(
      (res) => {
        post['favo_status'] = !post['favo_status'];
        console.log(`add=favo_status:${post.favo_status}`);
      }
    );
  }

  deleteFavo(post){
    this.favoriteService.deleteFavo(post.id).subscribe(
      (res) => {
        post['favo_status'] = !post['favo_status'];
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
