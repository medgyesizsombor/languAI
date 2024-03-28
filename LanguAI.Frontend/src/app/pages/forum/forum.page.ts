import { Component, OnInit } from '@angular/core';
import { FORUM_TITLE } from 'src/app/util/util.constants';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  title = FORUM_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
