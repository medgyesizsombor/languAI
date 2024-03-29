import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = '';
  @Input() navigationLink: string = '';

  constructor(private translateService: TranslateService, private router: Router) {  
  }

  ngOnInit() {
    this.title = this.translateService.instant(this.title);
  }

  navigateBack() {
    this.router.navigate(['/', this.navigationLink])
  }

}
