/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticate$Json } from '../fn/authentication/authenticate-json';
import { Authenticate$Json$Params } from '../fn/authentication/authenticate-json';
import { authenticate$Plain } from '../fn/authentication/authenticate-plain';
import { Authenticate$Plain$Params } from '../fn/authentication/authenticate-plain';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authenticate()` */
  static readonly AuthenticatePath = '/Authentication/Authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authenticate$Plain$Response(params?: Authenticate$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return authenticate$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authenticate$Plain(params?: Authenticate$Plain$Params, context?: HttpContext): Observable<string> {
    return this.authenticate$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticate$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authenticate$Json$Response(params?: Authenticate$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return authenticate$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticate$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authenticate$Json(params?: Authenticate$Json$Params, context?: HttpContext): Observable<string> {
    return this.authenticate$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
