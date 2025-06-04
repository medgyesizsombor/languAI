import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'summaryText',
  standalone: false
})
export class SummaryTextPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(exp: number): string {
    if (exp <= 0) {
      return this.translateService.instant('REALLY_BAD_RESULT_TEXT');
    } else if (exp >= 0 && exp <= 39) {
      return this.translateService.instant('BAD_RESULT_TEXT');
    } else if (exp >= 40 && exp <= 59) {
      return this.translateService.instant('NOT_TOO_BAD_RESULT_TEXT');
    } else if (exp >= 60 && exp <= 79) {
      return this.translateService.instant('GREAT_RESULT_TEXT');
    } else if (exp >= 80 && exp <= 99) {
      return this.translateService.instant('EXCELLENT_RESULT_TEXT');
    } else if (exp === 100) {
      return this.translateService.instant('PERFECT_RESULT_TEXT');
    } else {
      return this.translateService.instant('MISSING_EXP');
    }
  }
}
