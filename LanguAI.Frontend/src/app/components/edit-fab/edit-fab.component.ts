import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-fab',
  templateUrl: './edit-fab.component.html',
  styleUrls: ['./edit-fab.component.scss']
})
export class EditFabComponent implements OnInit {
  @Input('cardsNumber') cardsNumber = 0;
  @Input('showPlayButton') showPlayButton = false;
  @Output() addButtonEmit = new EventEmitter<Array<void>>();
  @Output() playButtonEmit = new EventEmitter<Array<void>>();

  constructor() {}

  ngOnInit() {}
}
