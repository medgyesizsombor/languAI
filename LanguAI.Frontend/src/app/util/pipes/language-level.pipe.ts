import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageLevelEnum } from 'src/api/models';
import { ADVANCED, BEGINNER, INTERMEDIATE } from '../util.constants';

@Pipe({
  name: 'languageLevel'
})
export class LanguageLevelPipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(
    value: LanguageLevelEnum | undefined,
    returnOnlyInEnglish = false
  ): string {
    switch (value) {
      case 1: {
        return returnOnlyInEnglish
          ? BEGINNER
          : this.translateService.instant(BEGINNER);
      }
      case 2: {
        return returnOnlyInEnglish
          ? 'INTERMEDIATE'
          : this.translateService.instant(INTERMEDIATE);
      }
      default: {
        return returnOnlyInEnglish
          ? ADVANCED
          : this.translateService.instant(ADVANCED);
      }
    }
  }
}
