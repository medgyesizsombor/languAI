import { Injectable } from '@angular/core';
import {
  JWT_TOKEN,
  NUMBER_OF_FRIENDSHIP_REQUEST,
  USER_ID
} from '../util.constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

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
}
