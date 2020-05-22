import { Router } from '@angular/router';
import { Post, Task } from './../../models/index';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  private newPost;
  private newTask = [];

  postTitle;
  postLimit;
  postDetail;

  tasks: string[] = [''];
  countTasks: number[] = [1];

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create() {
    console.log('create');
    console.log(this.tasks);
    let _tasks = this.deleteEmpty(this.tasks);
    _tasks.forEach((value) => {
      this.newTask.push({content: value});
    });
    this.newPost = {
      title: this.postTitle,
      detail: this.postDetail,
      limit: this.postLimit,
      tasks: this.newTask
    };
    console.log(this.newPost);
    console.log(!!this.tasks);
    console.log(_tasks.length !== 0);
    if (!this.postTitle.invalid && _tasks.length !== 0) {
      this.postService.addPost(this.newPost).subscribe((post) => {
        console.log(post);
        this.router.navigate(['list']);
      });
    }
  }

  //空白のタスクを削除
  deleteEmpty(array: string[]): string[] {
    return array.filter((value) => value !== '');
  }
}
