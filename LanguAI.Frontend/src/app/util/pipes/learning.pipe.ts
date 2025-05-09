import { Pipe, PipeTransform } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';

@Pipe({
  name: 'learning',
  standalone: false
})
export class LearningPipe implements PipeTransform {
  constructor(private localStorageService: LocalStorageService) {}

  transform(isNativeLanguage = true): string {
    const currentLearning = this.localStorageService.getCurrentLearning();
    if (isNativeLanguage) {
      return `WORD_IN.${currentLearning!.nativeLanguageName?.toUpperCase()}`;
    } else {
      return `WORD_IN.${currentLearning!.learningLanguageName?.toUpperCase()}`;
    }
  }
}
