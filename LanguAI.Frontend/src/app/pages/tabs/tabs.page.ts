import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub, faMedium, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSquare,
      faCheckSquare,
      faSquare,
      faCheckSquare,
      faMedium,
      faStackOverflow,
      faGithub,
      faArrowLeft
    );
  }
}
