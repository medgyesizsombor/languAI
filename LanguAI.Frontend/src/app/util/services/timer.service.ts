import { Injectable } from '@angular/core';
import { TimePipe } from '../pipes/time.pipe';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  interval: NodeJS.Timeout | undefined;
  seconds = 0;

  constructor(private timePipe: TimePipe) {}

  setTimer() {
    this.interval = setInterval(() => {
      this.seconds += 1;
    }, 1000);
  }

  getTime(): string {
    return this.timePipe.transform(this.seconds);
  }
}
