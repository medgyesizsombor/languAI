import { Component, OnInit } from '@angular/core';
import { MESSAGES_TITLE } from '../../util/util.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  title = this.translateService.instant(MESSAGES_TITLE);

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

}
