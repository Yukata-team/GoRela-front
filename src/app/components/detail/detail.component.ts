import { FavoriteService } from './../../services/favorite.service';
import { TaskService } from './../../services/task.service';
import { Post, Task, Favorite } from './../../models/index';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  public currentUserId = sessionStorage.getItem('current_user_id');

  constructor(
    private activatedroute: ActivatedRoute,
    private postService: PostService,
    private taskService: TaskService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.postService.getPost(this.id).subscribe((post) => {
      this.post = post;
      console.log(post);
      post['favo_status'] = this.isFavo(post.favorites);
      post['favorites_length'] = post.favorites.length;
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
    console.log("addFavo!!");
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

  delete(){
    this.postService.deletePost(this.post.id).subscribe(
      () => this.router.navigate(['list'])
    );
  }

  checkedTasksLength(): number{
    let length: number = 0;
    this.post['tasks'].forEach(value => {
      if(value['is_done']) length++;
    });
    return length;
  }

  isReach(): boolean{
    return this.post.tasks.length - this.checkedTasksLength() === 1;
  }

  isAchievement(): boolean{
    return this.post.tasks.length - this.checkedTasksLength() === 0;
  }

}
