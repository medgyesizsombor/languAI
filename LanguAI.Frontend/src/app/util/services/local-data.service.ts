import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { LanguageLevelEnum } from 'src/api/models';
import { ENGLISH_LANGUAGE_ID, HUNGARIAN_LANGUAGE_ID } from '../util.constants';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  currentLevel: LanguageLevelEnum | null = null;
  nativeLanguageId: number | null = null;
  nativeLanguageCode: string | null = null;

  constructor(private localStorageService: LocalStorageService) {}

  /**
   * Set values from tokenStorage
   */
  setValues() {
    this.currentLevel = this.localStorageService.getLevelOfCurrentLanguage();
    this.nativeLanguageId = this.localStorageService.getLanguageId();
    this.nativeLanguageCode = this.localStorageService.getLanguageCode();
    this.setNativeLanguages(this.localStorageService.getLanguageCode());
  }

  /**
   * Set native languages
   */
  setNativeLanguages(languageCode: string) {
    this.localStorageService.setLangugageCode(languageCode);
    this.localStorageService.setLangugageId(
      languageCode === 'hu' ? HUNGARIAN_LANGUAGE_ID : ENGLISH_LANGUAGE_ID
    );
    this.nativeLanguageId = this.localStorageService.getLanguageId();
    this.nativeLanguageCode = this.localStorageService.getLanguageCode();
  }
}
