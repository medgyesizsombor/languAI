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
import { getUserById$Json } from '../fn/user/get-user-by-id-json';
import { GetUserById$Json$Params } from '../fn/user/get-user-by-id-json';
import { getUserById$Plain } from '../fn/user/get-user-by-id-plain';
import { GetUserById$Plain$Params } from '../fn/user/get-user-by-id-plain';
import { saveUser$Json } from '../fn/user/save-user-json';
import { SaveUser$Json$Params } from '../fn/user/save-user-json';
import { saveUser$Plain } from '../fn/user/save-user-plain';
import { SaveUser$Plain$Params } from '../fn/user/save-user-plain';
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

}
