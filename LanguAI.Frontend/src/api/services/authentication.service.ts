/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authenticationAuthenticatePost$Json } from '../fn/authentication/authentication-authenticate-post-json';
import { AuthenticationAuthenticatePost$Json$Params } from '../fn/authentication/authentication-authenticate-post-json';
import { authenticationAuthenticatePost$Plain } from '../fn/authentication/authentication-authenticate-post-plain';
import { AuthenticationAuthenticatePost$Plain$Params } from '../fn/authentication/authentication-authenticate-post-plain';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `authenticationAuthenticatePost()` */
  static readonly AuthenticationAuthenticatePostPath = '/Authentication/Authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationAuthenticatePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authenticationAuthenticatePost$Plain$Response(params?: AuthenticationAuthenticatePost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return authenticationAuthenticatePost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticationAuthenticatePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authenticationAuthenticatePost$Plain(params?: AuthenticationAuthenticatePost$Plain$Params, context?: HttpContext): Observable<string> {
    return this.authenticationAuthenticatePost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authenticationAuthenticatePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authenticationAuthenticatePost$Json$Response(params?: AuthenticationAuthenticatePost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return authenticationAuthenticatePost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authenticationAuthenticatePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  authenticationAuthenticatePost$Json(params?: AuthenticationAuthenticatePost$Json$Params, context?: HttpContext): Observable<string> {
    return this.authenticationAuthenticatePost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
