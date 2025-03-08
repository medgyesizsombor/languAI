import { Injectable } from '@angular/core';
import {
  CURRENT_LEARNING,
  ENGLISH_LANGUAGE_CODE,
  ENGLISH_LANGUAGE_ID,
  HUNGARIAN_LANGUAGE_CODE,
  HUNGARIAN_LANGUAGE_ID,
  JWT_TOKEN,
  LANGUAGE_CODE,
  LANGUAGE_ID,
  LEVEL_OF_CURRENT_LANGUAGE,
  NUMBER_OF_FRIENDSHIP_REQUEST,
  STREAK,
  USER_ID
} from '../util.constants';
import {
  LanguageLevelEnum,
  LearningViewModel,
  UserDataViewModel
} from 'src/api/models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  /**
   * Set values of the user
   */
  setDataOfUser(user?: UserDataViewModel) {
    this.setUserId(user?.id!);
    this.setStreak(user?.streak!);
    this.setCurrentLearning(user?.currentLearning!);
    this.setLevelOfCurrentLanguage(user?.currentLearning?.languageLevel!);
    this.setNativeLanguagesById(user?.languageId!);
  }

  /**
   * Set Jwt token to localStorage
   */
  setJwtToken(value: string): boolean {
    if (value?.length) {
      localStorage.setItem(JWT_TOKEN, value);
      return true;
    }

    return false;
  }

  /**
   * Get Jwt token from localStorage
   */
  getJwtToken(): string | null {
    const jwtToken = localStorage.getItem(JWT_TOKEN);

    if (jwtToken?.length) {
      return JSON.stringify(jwtToken);
    }

    return jwtToken;
  }

  /**
   * Remove Jwt token from localStorage
   */
  removeJwtToken() {
    localStorage.removeItem(JWT_TOKEN);
  }

  /**
   * Set User Id to localStorage
   */
  setUserId(userId: number): boolean {
    if (userId) {
      localStorage.setItem(USER_ID, userId.toString());
      return true;
    }

    return false;
  }

  /**
   * Get User Id from localStorage
   */
  getUserId(): number | null {
    const userId = localStorage.getItem(USER_ID);

    if (userId?.length) {
      return +userId;
    }

    return null;
  }

  /**
   * Remove User Id from localStorage
   */
  removeUserId() {
    localStorage.removeItem(USER_ID);
  }

  /**
   * Set Number of Friendship request to localStorage
   */
  setNumberOfFriendshipRequest(numberOfNotifications: number): boolean {
    if (numberOfNotifications) {
      localStorage.setItem(
        NUMBER_OF_FRIENDSHIP_REQUEST,
        numberOfNotifications.toString()
      );
      return true;
    }

    return false;
  }

  /**
   * Get Number of Friendship request from localStorage
   */
  getNumberOfFriendshipRequest(): number | null {
    const numberOfNotifications = localStorage.getItem(
      NUMBER_OF_FRIENDSHIP_REQUEST
    );

    if (numberOfNotifications?.length) {
      return +numberOfNotifications;
    }

    return null;
  }

  /**
   * Remove Number of Friendship request from localStorage
   */
  removeNumberOfFriendshipRequest() {
    localStorage.removeItem(NUMBER_OF_FRIENDSHIP_REQUEST);
  }

  /**
   * Set Number of Friendship request to localStorage
   */
  setLevelOfCurrentLanguage(level: LanguageLevelEnum): boolean {
    if (level) {
      localStorage.setItem(LEVEL_OF_CURRENT_LANGUAGE, level.toString());
      return true;
    }

    return false;
  }

  /**
   * Get Number of Friendship request from localStorage
   */
  getLevelOfCurrentLanguage(): LanguageLevelEnum | null {
    const level = Number(localStorage.getItem(LEVEL_OF_CURRENT_LANGUAGE));

    if (!isNaN(level) && level in LanguageLevelEnum) {
      return level;
    }

    return null;
  }

  /**
   * Remove Number of Friendship request from localStorage
   */
  removeLevelOfCurrentLanguage() {
    localStorage.removeItem(LEVEL_OF_CURRENT_LANGUAGE);
  }

  /**
   * Set Id of native language
   */
  setLangugageId(languageId: number) {
    if (languageId) {
      localStorage.setItem(LANGUAGE_ID, languageId.toString());
      return true;
    }

    return false;
  }

  /**
   * Get Id of native language
   */
  getLanguageId(): number | null {
    const languageId = localStorage.getItem(LANGUAGE_ID);

    if (languageId?.length) {
      return +languageId;
    }

    return null;
  }

  /**
   * Remove Id of language
   */
  removeLanguageId() {
    localStorage.removeItem(LANGUAGE_ID);
  }

  /**
   * Set Code  of language
   */
  setLangugageCode(languageCode: string) {
    if (languageCode) {
      localStorage.setItem(LANGUAGE_CODE, languageCode);
      return true;
    }

    return false;
  }

  /**
   * Get Id of language
   */
  getLanguageCode(): string | null {
    return localStorage.getItem(LANGUAGE_CODE);
  }

  /**
   * Remove Code of language
   */
  removeLanguageCode() {
    localStorage.removeItem(LANGUAGE_CODE);
  }

  /**
   * Set Streak
   */
  setStreak(streak: number) {
    if (streak >= 0) {
      localStorage.setItem(STREAK, streak.toString());
      return true;
    }

    return false;
  }

  /**
   * Get number of streak
   */
  getStreak(): number {
    const streak = localStorage.getItem(STREAK);

    if (streak?.length) {
      return +streak;
    }

    return 0;
  }

  /**
   * Remove number of streak
   */
  removeStreak() {
    localStorage.removeItem(STREAK);
  }

  /**
   * Set native languages by code
   */
  setNativeLanguagesByCode(languageCode = HUNGARIAN_LANGUAGE_CODE) {
    this.setLangugageCode(languageCode);
    this.setLangugageId(
      languageCode === HUNGARIAN_LANGUAGE_CODE
        ? HUNGARIAN_LANGUAGE_ID
        : ENGLISH_LANGUAGE_ID
    );
  }

  /**
   * Set native languages by id
   */
  setNativeLanguagesById(languageId = HUNGARIAN_LANGUAGE_ID) {
    this.setLangugageId(languageId);
    this.setLangugageCode(
      languageId === HUNGARIAN_LANGUAGE_ID
        ? HUNGARIAN_LANGUAGE_CODE
        : ENGLISH_LANGUAGE_CODE
    );
  }

  /**
   * Get current learning
   */
  getCurrentLearning(): LearningViewModel | null {
    const currentLearning = localStorage.getItem(CURRENT_LEARNING);

    if (currentLearning?.length) {
      return JSON.parse(currentLearning);
    }

    return null;
  }

  /**
   * Remove current learning
   */
  removeCurrentLearning() {
    localStorage.removeItem(STREAK);
  }

  /**
   * Set current learning
   */
  setCurrentLearning(learning: LearningViewModel) {
    localStorage.setItem(CURRENT_LEARNING, JSON.stringify(learning));
  }


  /**
   * Clear the local storage
   */
  clearLocalStorage() {
    localStorage.clear();
  }
}
