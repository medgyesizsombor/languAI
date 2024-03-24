/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';

import { User } from '../models/user';

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
  getAllUsers$Plain$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<User>>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.GetAllUsersPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'text', accept: 'text/plain', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<User>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Plain(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<User>> {
    return this.getAllUsers$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Json$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<Array<User>>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.GetAllUsersPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'text/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<User>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Json(
    params?: {
    },
    context?: HttpContext
  ): Observable<Array<User>> {
    return this.getAllUsers$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<User>>): Array<User> => r.body)
    );
  }

}
