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

  @Input() post: Post;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    // this.commentService.getComments().subscribe((comments) => {
    //   this.comments = comments.filter(
    //     (value) => value['post_id'] === this.post_id
    //   );
    // });
    this.comments = this.post.comments;
    console.log(typeof(this.comments));
  }

  create() {
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
