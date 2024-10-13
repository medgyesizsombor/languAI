import { Pipe, PipeTransform } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';
import { LearningViewModel } from 'src/api/models';
import { HUNGARIAN_LANGUAGE_ID } from '../util.constants';

@Pipe({
  name: 'languageName'
})
export class LanguageNamePipe implements PipeTransform {
  constructor(private localDataService: LocalDataService) {}

  transform(learning: LearningViewModel): string | undefined | null {
    return this.localDataService.nativeLanguageId === HUNGARIAN_LANGUAGE_ID
      ? learning.languageNameInHun
      : learning.languageName;
  }
}
