import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = ''; 

  constructor(private translateService: TranslateService) {  
  }

  ngOnInit() {
    this.title = this.translateService.instant(this.title);
  }

}
