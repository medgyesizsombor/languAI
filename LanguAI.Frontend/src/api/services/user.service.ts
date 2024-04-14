/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { editUser$Json } from '../fn/user/edit-user-json';
import { EditUser$Json$Params } from '../fn/user/edit-user-json';
import { editUser$Plain } from '../fn/user/edit-user-plain';
import { EditUser$Plain$Params } from '../fn/user/edit-user-plain';
import { getAllUsers$Json } from '../fn/user/get-all-users-json';
import { GetAllUsers$Json$Params } from '../fn/user/get-all-users-json';
import { getAllUsers$Plain } from '../fn/user/get-all-users-plain';
import { GetAllUsers$Plain$Params } from '../fn/user/get-all-users-plain';
import { getUserById$Json } from '../fn/user/get-user-by-id-json';
import { GetUserById$Json$Params } from '../fn/user/get-user-by-id-json';
import { getUserById$Plain } from '../fn/user/get-user-by-id-plain';
import { GetUserById$Plain$Params } from '../fn/user/get-user-by-id-plain';
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

  /** Path part for operation `editUser()` */
  static readonly EditUserPath = '/User/SaveUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editUser$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editUser$Plain$Response(params?: EditUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return editUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editUser$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editUser$Plain(params?: EditUser$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.editUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editUser$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editUser$Json$Response(params?: EditUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return editUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editUser$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editUser$Json(params?: EditUser$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.editUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
