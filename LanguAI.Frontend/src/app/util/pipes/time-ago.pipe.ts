import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'timeAgo',
  standalone: false
})
export class TimeAgoPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: string): string {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

      // less than 30 seconds ago will show as 'Just now'
      if (seconds < 29) {
        return this.translateService.instant('JUST_NOW');
      }

      const intervals: { [key: string]: number } = {
        YEAR: 31536000,
        MONTH: 2592000,
        WEEK: 604800,
        DAY: 86400,
        HOUR: 3600,
        MINUTE: 60,
        SECOND: 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return this.translateService.instant(`${i}_SINGULAR_AGO`, {
              counter
            }); // this is important for english (1 day ago)
          } else {
            return this.translateService.instant(`${i}_PLURAL_AGO`, {
              counter
            }); // this is important for english (2 days ago)
          }
      }
    }
    return value;
  }
}
