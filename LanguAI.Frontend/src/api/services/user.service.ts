/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { changePassword$Json } from '../fn/user/change-password-json';
import { ChangePassword$Json$Params } from '../fn/user/change-password-json';
import { changePassword$Plain } from '../fn/user/change-password-plain';
import { ChangePassword$Plain$Params } from '../fn/user/change-password-plain';
import { deleteUser$Json } from '../fn/user/delete-user-json';
import { DeleteUser$Json$Params } from '../fn/user/delete-user-json';
import { deleteUser$Plain } from '../fn/user/delete-user-plain';
import { DeleteUser$Plain$Params } from '../fn/user/delete-user-plain';
import { getAllUsers$Json } from '../fn/user/get-all-users-json';
import { GetAllUsers$Json$Params } from '../fn/user/get-all-users-json';
import { getAllUsers$Plain } from '../fn/user/get-all-users-plain';
import { GetAllUsers$Plain$Params } from '../fn/user/get-all-users-plain';
import { getCurrentUser$Json } from '../fn/user/get-current-user-json';
import { GetCurrentUser$Json$Params } from '../fn/user/get-current-user-json';
import { getCurrentUser$Plain } from '../fn/user/get-current-user-plain';
import { GetCurrentUser$Plain$Params } from '../fn/user/get-current-user-plain';
import { getDataOfUser$Json } from '../fn/user/get-data-of-user-json';
import { GetDataOfUser$Json$Params } from '../fn/user/get-data-of-user-json';
import { getDataOfUser$Plain } from '../fn/user/get-data-of-user-plain';
import { GetDataOfUser$Plain$Params } from '../fn/user/get-data-of-user-plain';
import { getProfilePageData$Json } from '../fn/user/get-profile-page-data-json';
import { GetProfilePageData$Json$Params } from '../fn/user/get-profile-page-data-json';
import { getProfilePageData$Plain } from '../fn/user/get-profile-page-data-plain';
import { GetProfilePageData$Plain$Params } from '../fn/user/get-profile-page-data-plain';
import { getStreakOfCurrentUser$Json } from '../fn/user/get-streak-of-current-user-json';
import { GetStreakOfCurrentUser$Json$Params } from '../fn/user/get-streak-of-current-user-json';
import { getStreakOfCurrentUser$Plain } from '../fn/user/get-streak-of-current-user-plain';
import { GetStreakOfCurrentUser$Plain$Params } from '../fn/user/get-streak-of-current-user-plain';
import { getUserById$Json } from '../fn/user/get-user-by-id-json';
import { GetUserById$Json$Params } from '../fn/user/get-user-by-id-json';
import { getUserById$Plain } from '../fn/user/get-user-by-id-plain';
import { GetUserById$Plain$Params } from '../fn/user/get-user-by-id-plain';
import { ProfilePageDataViewModel } from '../models/profile-page-data-view-model';
import { saveUser$Json } from '../fn/user/save-user-json';
import { SaveUser$Json$Params } from '../fn/user/save-user-json';
import { saveUser$Plain } from '../fn/user/save-user-plain';
import { SaveUser$Plain$Params } from '../fn/user/save-user-plain';
import { setProfilePicture$Json } from '../fn/user/set-profile-picture-json';
import { SetProfilePicture$Json$Params } from '../fn/user/set-profile-picture-json';
import { setProfilePicture$Plain } from '../fn/user/set-profile-picture-plain';
import { SetProfilePicture$Plain$Params } from '../fn/user/set-profile-picture-plain';
import { UserDataViewModel } from '../models/user-data-view-model';
import { UserViewModel } from '../models/user-view-model';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllUsers()` */
  static readonly GetAllUsersPath = '/User/GetAllUsers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Plain$Response(params?: GetAllUsers$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserViewModel>>> {
    return getAllUsers$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Plain(params?: GetAllUsers$Plain$Params, context?: HttpContext): Observable<Array<UserViewModel>> {
    return this.getAllUsers$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserViewModel>>): Array<UserViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Json$Response(params?: GetAllUsers$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserViewModel>>> {
    return getAllUsers$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Json(params?: GetAllUsers$Json$Params, context?: HttpContext): Observable<Array<UserViewModel>> {
    return this.getAllUsers$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserViewModel>>): Array<UserViewModel> => r.body)
    );
  }

  /** Path part for operation `getUserById()` */
  static readonly GetUserByIdPath = '/User/GetUserById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Plain$Response(params?: GetUserById$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModel>> {
    return getUserById$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Plain(params?: GetUserById$Plain$Params, context?: HttpContext): Observable<UserViewModel> {
    return this.getUserById$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserViewModel>): UserViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserById$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Json$Response(params?: GetUserById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModel>> {
    return getUserById$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserById$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserById$Json(params?: GetUserById$Json$Params, context?: HttpContext): Observable<UserViewModel> {
    return this.getUserById$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserViewModel>): UserViewModel => r.body)
    );
  }

  /** Path part for operation `getCurrentUser()` */
  static readonly GetCurrentUserPath = '/User/GetCurrentUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Plain$Response(params?: GetCurrentUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModel>> {
    return getCurrentUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Plain(params?: GetCurrentUser$Plain$Params, context?: HttpContext): Observable<UserViewModel> {
    return this.getCurrentUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserViewModel>): UserViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCurrentUser$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Json$Response(params?: GetCurrentUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModel>> {
    return getCurrentUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCurrentUser$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCurrentUser$Json(params?: GetCurrentUser$Json$Params, context?: HttpContext): Observable<UserViewModel> {
    return this.getCurrentUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserViewModel>): UserViewModel => r.body)
    );
  }

  /** Path part for operation `saveUser()` */
  static readonly SaveUserPath = '/User/SaveUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveUser$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveUser$Plain$Response(params?: SaveUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveUser$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveUser$Plain(params?: SaveUser$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.saveUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveUser$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveUser$Json$Response(params?: SaveUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveUser$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveUser$Json(params?: SaveUser$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.saveUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `changePassword()` */
  static readonly ChangePasswordPath = '/User/ChangePassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  changePassword$Plain$Response(params?: ChangePassword$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return changePassword$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  changePassword$Plain(params?: ChangePassword$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.changePassword$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changePassword$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  changePassword$Json$Response(params?: ChangePassword$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return changePassword$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changePassword$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  changePassword$Json(params?: ChangePassword$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.changePassword$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `deleteUser()` */
  static readonly DeleteUserPath = '/User/DeleteUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Plain$Response(params?: DeleteUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Plain(params?: DeleteUser$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteUser$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Json$Response(params?: DeleteUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteUser$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteUser$Json(params?: DeleteUser$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getStreakOfCurrentUser()` */
  static readonly GetStreakOfCurrentUserPath = '/User/GetStreakOfCurrentUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStreakOfCurrentUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStreakOfCurrentUser$Plain$Response(params?: GetStreakOfCurrentUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getStreakOfCurrentUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStreakOfCurrentUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStreakOfCurrentUser$Plain(params?: GetStreakOfCurrentUser$Plain$Params, context?: HttpContext): Observable<number> {
    return this.getStreakOfCurrentUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStreakOfCurrentUser$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStreakOfCurrentUser$Json$Response(params?: GetStreakOfCurrentUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return getStreakOfCurrentUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStreakOfCurrentUser$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStreakOfCurrentUser$Json(params?: GetStreakOfCurrentUser$Json$Params, context?: HttpContext): Observable<number> {
    return this.getStreakOfCurrentUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getDataOfUser()` */
  static readonly GetDataOfUserPath = '/User/GetDataOfUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDataOfUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataOfUser$Plain$Response(params?: GetDataOfUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDataViewModel>> {
    return getDataOfUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDataOfUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataOfUser$Plain(params?: GetDataOfUser$Plain$Params, context?: HttpContext): Observable<UserDataViewModel> {
    return this.getDataOfUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDataViewModel>): UserDataViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDataOfUser$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataOfUser$Json$Response(params?: GetDataOfUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDataViewModel>> {
    return getDataOfUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getDataOfUser$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDataOfUser$Json(params?: GetDataOfUser$Json$Params, context?: HttpContext): Observable<UserDataViewModel> {
    return this.getDataOfUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDataViewModel>): UserDataViewModel => r.body)
    );
  }

  /** Path part for operation `setProfilePicture()` */
  static readonly SetProfilePicturePath = '/User/SetProfilePicture';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setProfilePicture$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  setProfilePicture$Plain$Response(params?: SetProfilePicture$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return setProfilePicture$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setProfilePicture$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setProfilePicture$Plain(params?: SetProfilePicture$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.setProfilePicture$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setProfilePicture$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  setProfilePicture$Json$Response(params?: SetProfilePicture$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return setProfilePicture$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `setProfilePicture$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setProfilePicture$Json(params?: SetProfilePicture$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.setProfilePicture$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getProfilePageData()` */
  static readonly GetProfilePageDataPath = '/User/GetProfilePageDataById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProfilePageData$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfilePageData$Plain$Response(params?: GetProfilePageData$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<ProfilePageDataViewModel>> {
    return getProfilePageData$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProfilePageData$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfilePageData$Plain(params?: GetProfilePageData$Plain$Params, context?: HttpContext): Observable<ProfilePageDataViewModel> {
    return this.getProfilePageData$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProfilePageDataViewModel>): ProfilePageDataViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProfilePageData$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfilePageData$Json$Response(params?: GetProfilePageData$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<ProfilePageDataViewModel>> {
    return getProfilePageData$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProfilePageData$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfilePageData$Json(params?: GetProfilePageData$Json$Params, context?: HttpContext): Observable<ProfilePageDataViewModel> {
    return this.getProfilePageData$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProfilePageDataViewModel>): ProfilePageDataViewModel => r.body)
    );
  }

}
