import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  interval: NodeJS.Timeout | undefined;
  seconds = 0;

  constructor() {}

  setTimer() {
    this.interval = setInterval(() => {
      this.seconds += 1;
    }, 1000);
  }

  getTime(): number {
    return this.seconds;
  }
}
