import { Component, OnInit } from '@angular/core';
import { LESSONS_TITLE } from 'src/app/util/util.constants';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  title = LESSONS_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
