import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PostViewModel } from 'src/api/models';

@Component({
  selector: 'app-post-component',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostViewModel | undefined;
  @Input() navigate = false;
  @Input() showCommentButton = true;

  @Output() likeButtonEmit = new EventEmitter<number>();
  @Output() navigateButtonEmit = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  like(postId: number) {
    this.likeButtonEmit.emit(postId);
  }

  navigateToPost(postId: number) {
    this.navigateButtonEmit.emit(postId);
  }
}
