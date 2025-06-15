import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FooterPageEnum } from 'src/app/util/enums/footer-page-enum';
import { FriendshipRequestService } from 'src/app/util/services/friendship-request.service';
import {
  CARD_LISTS_NAVIGATION,
  FORUM_NAVIGATION,
  LESSONS_NAVIGATION,
  MESSAGES_NAVIGATION,
  SETTINGS_NAVIGATION
} from 'src/app/util/util.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false
})
export class FooterComponent implements OnInit {
  numberOfFriendshipRequest = 0;
  activePage = FooterPageEnum.lessonsPage;
  footerPageEnum = FooterPageEnum;

  constructor(
    private friendshipRequestService: FriendshipRequestService,
    private router: Router
  ) {}

  ngOnInit() {
    const url = this.router.url.substring(1);

    this.loadData(url);
  }

  navigateToPage(page: FooterPageEnum) {
    switch (page) {
      case FooterPageEnum.cardListsPage: {
        this.router.navigate(['/' + CARD_LISTS_NAVIGATION]);
        break;
      }
      case FooterPageEnum.forumPage: {
        this.router.navigate(['/' + FORUM_NAVIGATION]);
        break;
      }
      case FooterPageEnum.messagesPage: {
        this.router.navigate(['/' + MESSAGES_NAVIGATION]);
        break;
      }
      case FooterPageEnum.settingsPage: {
        this.router.navigate(['/' + SETTINGS_NAVIGATION]);
        break;
      }
      default: {
        this.router.navigate(['/' + LESSONS_NAVIGATION]);
        break;
      }
    }
  }

  private loadData(url: string) {
    this.friendshipRequestService
      .getFriendshipRequest()
      .then((res: number) => {
        this.numberOfFriendshipRequest = res;
      })
      .catch(() => {
        this.numberOfFriendshipRequest = 0;
      });

    switch (url) {
      case CARD_LISTS_NAVIGATION: {
        this.activePage = FooterPageEnum.cardListsPage;
        break;
      }
      case FORUM_NAVIGATION: {
        this.activePage = FooterPageEnum.forumPage;
        break;
      }
      case MESSAGES_NAVIGATION: {
        this.activePage = FooterPageEnum.messagesPage;
        break;
      }
      case SETTINGS_NAVIGATION: {
        this.activePage = FooterPageEnum.settingsPage;
        break;
      }
      default: {
        this.activePage = FooterPageEnum.lessonsPage;
        break;
      }
    }
  }
}
