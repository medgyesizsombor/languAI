import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentViewModel } from 'src/api/models';
import { LocalStorageService } from 'src/app/util/services/localstorage.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentViewModel | undefined;
  @Output() likeButtonEmit = new EventEmitter<number>();
  @Output() deleteButtonEmit = new EventEmitter<number>();

  userId: number | undefined;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.userId = this.localStorageService.getUserId()!;
  }

  like() {
    this.likeButtonEmit.emit(this.comment?.id);
  }

  delete() {
    this.deleteButtonEmit.emit(this.comment?.id);
  }
}
