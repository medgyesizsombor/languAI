import { Component, OnInit } from '@angular/core';
import { PostViewModel } from 'src/api/models';
import { FORUM_TITLE } from 'src/app/util/util.constants';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  title = FORUM_TITLE;

  models: PostViewModel[] = [
    {
      content: 'assdasdasd',
      id: 1,
      username: 'zsombi',
      created: '2024.05.15 19:37',
    },
    {
      content: 'assdasdasd',
      id: 1,
      username: 'zsombi',
      created: '2024.05.15 19:37',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
