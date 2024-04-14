/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { register$Json } from '../fn/registration/register-json';
import { Register$Json$Params } from '../fn/registration/register-json';
import { register$Plain } from '../fn/registration/register-plain';
import { Register$Plain$Params } from '../fn/registration/register-plain';

@Injectable({ providedIn: 'root' })
export class RegistrationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `register()` */
  static readonly RegisterPath = '/Registration/Register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Plain$Response(params?: Register$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return register$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Plain(params?: Register$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.register$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Json$Response(params?: Register$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return register$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `register$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  register$Json(params?: Register$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.register$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
