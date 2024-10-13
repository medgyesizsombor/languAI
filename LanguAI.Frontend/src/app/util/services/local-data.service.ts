import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';
import { LanguageLevelEnum } from 'src/api/models';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {
  currentLevel: LanguageLevelEnum | null = null;
  nativeLanguageId: number | null = null;

  constructor(private localStorageService: LocalStorageService) {}

  /**
   * Set values from tokenStorage
   */
  setValues() {
    this.currentLevel = this.localStorageService.getLevelOfCurrentLanguage();
    this.nativeLanguageId = this.localStorageService.getLanguageId();
  }
}
