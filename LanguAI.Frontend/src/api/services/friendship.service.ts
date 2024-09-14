/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { FriendshipStatusEnum } from '../models/friendship-status-enum';
import { getFriendList$Json } from '../fn/friendship/get-friend-list-json';
import { GetFriendList$Json$Params } from '../fn/friendship/get-friend-list-json';
import { getFriendList$Plain } from '../fn/friendship/get-friend-list-plain';
import { GetFriendList$Plain$Params } from '../fn/friendship/get-friend-list-plain';
import { IntSelectorModel } from '../models/int-selector-model';
import { reactFriendshipRequest$Json } from '../fn/friendship/react-friendship-request-json';
import { ReactFriendshipRequest$Json$Params } from '../fn/friendship/react-friendship-request-json';
import { reactFriendshipRequest$Plain } from '../fn/friendship/react-friendship-request-plain';
import { ReactFriendshipRequest$Plain$Params } from '../fn/friendship/react-friendship-request-plain';
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

  /** Path part for operation `getFriendList()` */
  static readonly GetFriendListPath = '/Friendship/GetFriendList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFriendList$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFriendList$Plain$Response(params?: GetFriendList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
    return getFriendList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFriendList$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFriendList$Plain(params?: GetFriendList$Plain$Params, context?: HttpContext): Observable<Array<IntSelectorModel>> {
    return this.getFriendList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<IntSelectorModel>>): Array<IntSelectorModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFriendList$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFriendList$Json$Response(params?: GetFriendList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
    return getFriendList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getFriendList$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFriendList$Json(params?: GetFriendList$Json$Params, context?: HttpContext): Observable<Array<IntSelectorModel>> {
    return this.getFriendList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<IntSelectorModel>>): Array<IntSelectorModel> => r.body)
    );
  }

  /** Path part for operation `reactFriendshipRequest()` */
  static readonly ReactFriendshipRequestPath = '/Friendship/ReactFriendshipRequest';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reactFriendshipRequest$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  reactFriendshipRequest$Plain$Response(params?: ReactFriendshipRequest$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FriendshipStatusEnum>> {
    return reactFriendshipRequest$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reactFriendshipRequest$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reactFriendshipRequest$Plain(params?: ReactFriendshipRequest$Plain$Params, context?: HttpContext): Observable<FriendshipStatusEnum> {
    return this.reactFriendshipRequest$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<FriendshipStatusEnum>): FriendshipStatusEnum => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reactFriendshipRequest$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  reactFriendshipRequest$Json$Response(params?: ReactFriendshipRequest$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FriendshipStatusEnum>> {
    return reactFriendshipRequest$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `reactFriendshipRequest$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reactFriendshipRequest$Json(params?: ReactFriendshipRequest$Json$Params, context?: HttpContext): Observable<FriendshipStatusEnum> {
    return this.reactFriendshipRequest$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<FriendshipStatusEnum>): FriendshipStatusEnum => r.body)
    );
  }

}
