import { Router } from '@angular/router';
import { Comment, Post } from './../../models/index';
import { CommentService } from './../../services/comment.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  public comments: Comment[];
  private newComment;

  public commentContent: string;
  public currentUserId = sessionStorage.getItem('current_user_id');

  @Input() post: Post;

  constructor(
    private commentService: CommentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.comments = this.post.comments;
    console.log(typeof(this.comments));
  }

  create() {
    if(!this.currentUserId){
      this.router.navigate(['register']);
    }
    else{
      this.newComment = {
        "content": this.commentContent
      };
      console.log(this.newComment);
      this.commentService.addComment(this.newComment, this.post.id).subscribe((comment) => {
        this.comments.unshift(comment);
        this.commentContent = '';
      });
    }
  }
}
