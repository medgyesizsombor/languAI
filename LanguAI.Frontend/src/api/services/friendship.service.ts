/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { requestFriendship$Json } from '../fn/friendship/request-friendship-json';
import { RequestFriendship$Json$Params } from '../fn/friendship/request-friendship-json';
import { requestFriendship$Plain } from '../fn/friendship/request-friendship-plain';
import { RequestFriendship$Plain$Params } from '../fn/friendship/request-friendship-plain';

@Injectable({ providedIn: 'root' })
export class FriendshipService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `requestFriendship()` */
  static readonly RequestFriendshipPath = '/Friendship/RequestFriendship';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestFriendship$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestFriendship$Plain$Response(params?: RequestFriendship$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return requestFriendship$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestFriendship$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestFriendship$Plain(params?: RequestFriendship$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.requestFriendship$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `requestFriendship$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestFriendship$Json$Response(params?: RequestFriendship$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return requestFriendship$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `requestFriendship$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  requestFriendship$Json(params?: RequestFriendship$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.requestFriendship$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
