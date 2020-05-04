import { TaskService } from './../../services/task.service';
import { Post } from './../../models/index';
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

  constructor(
    private postService: PostService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });

    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });

    setTimeout(() => {
      this.posts.forEach((value) => {
        value['tasks'] = this.tasks.filter((task) => task.post_id === value.id);
      });
    }, 1000);
  }
}
