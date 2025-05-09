import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { LearningViewModel } from 'src/api/models';
import { HUNGARIAN_LANGUAGE_ID } from '../util.constants';

@Pipe({
  name: 'languageName',
  standalone: false
})
export class LanguageNamePipe implements PipeTransform {
  constructor(private localStorageService: LocalStorageService) {}

  transform(learning: LearningViewModel): string | undefined | null {
    return this.localStorageService.getLanguageId() === HUNGARIAN_LANGUAGE_ID
      ? learning.learningLanguageNameInHun
      : learning.learningLanguageName;
  }
}
