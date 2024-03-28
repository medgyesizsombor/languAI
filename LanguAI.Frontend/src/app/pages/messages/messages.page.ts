import { Component, OnInit } from '@angular/core';
import { MESSAGES_TITLE } from '../../util/util.constants';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  title = MESSAGES_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
