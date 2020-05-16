import { TaskService } from './../../services/task.service';
import { Post, Task } from './../../models/index';
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
  public post: Post;
  public tasks: Task[];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.postService.getPost(this.id).subscribe((post) => {
      this.post = post;
      // this.taskService.getTasks().subscribe((tasks) => {
      //   this.tasks = tasks.filter((value) => value['post_id'] === post.id);
      // });
      console.log(post);
    });
  }
}
