import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Statistics } from 'src/app/util/models/statistic-view-model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {
  @Input() statistics: Statistics | undefined;
  @Output() navigateToLessonsEmit = new EventEmitter<void>();
  exp: number = 0;

  constructor() {}

  ngOnInit() {
    this.calculateExp();
  }

  //TODO save the summary

  ngOnDestroy() {}

  /**
   * Calculate the experience by the mistakes
   *
   */
  calculateExp() {
    if (
      this.statistics?.allAnswer &&
      (this.statistics?.mistakes === 0 || this.statistics?.mistakes)
    ) {
      this.exp = this.statistics?.allAnswer - this.statistics?.mistakes;
    }
  }

  navigateToLessons() {
    this.navigateToLessonsEmit.emit();
  }
}
