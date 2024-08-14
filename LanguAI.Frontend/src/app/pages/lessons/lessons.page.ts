import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LESSONS_TITLE } from 'src/app/util/util.constants';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  title = this.translateService.instant(LESSONS_TITLE);

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

}
