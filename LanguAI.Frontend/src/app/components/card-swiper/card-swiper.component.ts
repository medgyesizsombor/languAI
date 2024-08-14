import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { CardViewModel } from 'src/api/models';
import {
  Gesture,
  GestureController,
  GestureDetail,
  Platform
} from '@ionic/angular';

@Component({
  selector: 'app-card-swiper',
  templateUrl: './card-swiper.component.html',
  styleUrls: ['./card-swiper.component.scss']
})
export class CardSwiperComponent implements OnInit, OnChanges {
  @ViewChildren('deck', { read: ElementRef }) deck:
    | QueryList<ElementRef>
    | undefined;

  @Input('generatedCards') generatedCards: Array<CardViewModel> = [];

  @Output() addCardsEmit = new EventEmitter<Array<CardViewModel>>();

  counter = 0;
  cardsToBeAdded: Array<CardViewModel> = [];

  constructor(
    private gestureController: GestureController,
    private platform: Platform
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      this.useSwipe();
    }, 1000);
  }

  ngOnInit() {
    this.useSwipe();
  }

  ionViewWillEnter() {}

  private useSwipe() {
    this.deck?.forEach(d => {
      const gesture: Gesture = this.gestureController.create(
        {
          el: d.nativeElement,
          gestureName: 'test-swipe',
          onMove: gestureDetail => this.onMoveHandler(gestureDetail, d),
          onEnd: gestureDetail => this.onEndHandler(gestureDetail, d)
        },
        true
      );

      gesture?.enable();
    });
  }

  /**
   * Handle the moving of the card
   */
  private onMoveHandler(gestureDetail: GestureDetail, card: ElementRef<any>) {
    card.nativeElement.style.transform = `translateX(${
      gestureDetail.deltaX
    }px) rotate(${gestureDetail.deltaX / 10}deg)`;
  }

  /**
   * Handle when the moving of the card is stopped
   */
  private onEndHandler(gestureDetail: GestureDetail, card: ElementRef<any>) {
    card.nativeElement.style.transition = '.5s ease-out';

    if (gestureDetail.deltaX > 150) {
      card.nativeElement.style.transform = `translateX(${
        +this.platform.width() * 2
      }px) rotate(${gestureDetail.deltaX / 2}deg)`;
      setTimeout(() => {
        this.counter++;
        // The order of the cards is reversed
        this.cardsToBeAdded.push(
          this.generatedCards[this.generatedCards?.length - this.counter]
        );
        card.nativeElement.style.display = 'none';
        this.lastCardEvent();
      }, 500);
    } else if (gestureDetail.deltaX < -150) {
      this.counter++;
      card.nativeElement.style.transform = `translateX(${
        -this.platform.width() * 2
      }px) rotate(${gestureDetail.deltaX / 2}deg)`;
      this.lastCardEvent();
    } else {
      card.nativeElement.style.transform = '';
    }
  }

  /**
   * If this is the last card, returns with the cards
   */
  private lastCardEvent() {
    if (this.counter === this.generatedCards?.length) {
      this.addCardsEmit.emit(this.cardsToBeAdded);
    }
  }
}
