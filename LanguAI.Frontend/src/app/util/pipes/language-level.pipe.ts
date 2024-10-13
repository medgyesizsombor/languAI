import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageLevelEnum } from 'src/api/models';

@Pipe({
  name: 'languageLevel'
})
export class LanguageLevelPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: LanguageLevelEnum | undefined): string {
    switch (value) {
      case 1: {
        return this.translateService.instant('BEGINNER');
      }
      case 2: {
        return this.translateService.instant('INTERMEDIATE');
      }
      default: {
        return this.translateService.instant('ADVANCED');
      }
    }
  }
}
