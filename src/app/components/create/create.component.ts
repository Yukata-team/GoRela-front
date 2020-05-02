import { Router } from '@angular/router';
import { TaskService } from './../../services/task.service';
import { Post, Task } from './../../models/index';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  private newPost;
  private newTask;

  postTitle;
  postLimit;
  postDetail;

  tasks: string[] = [''];
  countTasks: number[] = [1];

  constructor(
    private postService: PostService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create() {
    console.log('create');
    console.log(this.tasks);
    this.newPost = {
      title: this.postTitle,
      limit: this.postLimit,
      detail: this.postDetail,
    };
    console.log(this.newPost);
    console.log(!!this.tasks);
    let _tasks = this.deleteEmpty(this.tasks);
    console.log(_tasks.length !== 0);
    if (!this.postTitle.invalid && _tasks.length !== 0) {
      this.postService.addPost(this.newPost).subscribe((post) => {
        _tasks.forEach((value) => {
          console.log(value);
          this.newTask = {
            content: value,
            post_id: post.id,
          };
          this.taskService.addTask(this.newTask).subscribe((task) => {
            if (task) {
              this.router.navigate(['list']);
            }
          });
        });
      });
    }
  }

  //空白のタスクを削除
  deleteEmpty(array: string[]): string[] {
    return array.filter((value) => value !== '');
  }
}
