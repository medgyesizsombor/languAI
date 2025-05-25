import { Pipe, PipeTransform } from '@angular/core';
import { CardListViewModel } from 'src/api/models';
import { LocalStorageService } from '../services/localstorage.service';
import { HUNGARIAN_LANGUAGE_CODE } from '../util.constants';

@Pipe({
  name: 'cardlistLanguagePipe',
  standalone: false
})
export class CardlistLanguagePipe implements PipeTransform {
  constructor(private localStorageService: LocalStorageService) {}

  transform(cardList: CardListViewModel): string {
    const mobileLanguageCode = this.localStorageService.getMobileLanguageCode();
    return `${
      mobileLanguageCode === HUNGARIAN_LANGUAGE_CODE
        ? cardList.nativeLanguage?.nameInHun
        : cardList.nativeLanguage?.name
    }-${
      mobileLanguageCode === HUNGARIAN_LANGUAGE_CODE
        ? cardList.learningLanguage?.nameInHun
        : cardList.learningLanguage?.name
    }`;
  }
}
