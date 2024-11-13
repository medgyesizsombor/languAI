import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(seconds: number): string {
    const mins = 60 / seconds;
    const secs = 60 % seconds;
    return `${mins}:${secs}`;
  }
}
