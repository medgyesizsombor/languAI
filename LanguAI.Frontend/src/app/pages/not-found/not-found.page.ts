import { Component, OnInit } from '@angular/core';
import { LESSONS_NAVIGATION } from 'src/app/util/util.constants';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: false
})
export class NotFoundPage implements OnInit {
  navigateBackRouter = LESSONS_NAVIGATION;
  constructor() {}

  ngOnInit() {}
}
