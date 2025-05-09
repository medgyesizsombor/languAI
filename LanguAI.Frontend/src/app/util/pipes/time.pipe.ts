import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: false
})
export class TimePipe implements PipeTransform {
  transform(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.formatTo2digits(mins)}:${this.formatTo2digits(secs)}`;
  }

  private formatTo2digits(number: number) {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }
}
