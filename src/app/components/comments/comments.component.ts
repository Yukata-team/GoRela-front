import { CommentService } from './../../services/comment.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  public comments;
  private newComment;

  public commentContent: string;

  @Input() post_id: number;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.getComments().subscribe((comments) => {
      this.comments = comments.filter(
        (value) => value['post_id'] === this.post_id
      );
    });
  }

  create() {
    this.newComment = {
      content: this.commentContent,
      user_id: 1,
      post_id: this.post_id,
    };
    console.log(this.newComment);
    this.commentService.addComment(this.newComment).subscribe((comment) => {
      this.comments.push(comment);
      this.commentContent = '';
    });
  }
}
