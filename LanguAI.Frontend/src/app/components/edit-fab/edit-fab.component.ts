import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-fab',
  templateUrl: './edit-fab.component.html',
  styleUrls: ['./edit-fab.component.scss']
})
export class EditFabComponent implements OnInit {
  @Input('cardsNumber') cardsNumber = 0;
  @Input('showPlayButton') showPlayButton = false;
  @Input('isCardListOfOtherUser') isCardListOfOtherUser = false;
  @Output() addButtonEmit = new EventEmitter<void>();
  @Output() playButtonEmit = new EventEmitter<void>();
  @Output() copyButtonEmit = new EventEmitter<void>()

  constructor() {}

  ngOnInit() {}
}
