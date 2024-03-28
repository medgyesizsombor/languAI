import { Component, OnInit } from '@angular/core';
import { CARDS_TITLE } from 'src/app/util/util.constants';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  title = CARDS_TITLE;

  constructor() { }

  ngOnInit() {
  }

}
