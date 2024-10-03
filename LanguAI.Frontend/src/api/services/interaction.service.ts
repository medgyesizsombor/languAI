/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteInteraction$Json } from '../fn/interaction/delete-interaction-json';
import { DeleteInteraction$Json$Params } from '../fn/interaction/delete-interaction-json';
import { deleteInteraction$Plain } from '../fn/interaction/delete-interaction-plain';
import { DeleteInteraction$Plain$Params } from '../fn/interaction/delete-interaction-plain';
import { saveInteraction$Json } from '../fn/interaction/save-interaction-json';
import { SaveInteraction$Json$Params } from '../fn/interaction/save-interaction-json';
import { saveInteraction$Plain } from '../fn/interaction/save-interaction-plain';
import { SaveInteraction$Plain$Params } from '../fn/interaction/save-interaction-plain';

@Injectable({ providedIn: 'root' })
export class InteractionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveInteraction()` */
  static readonly SaveInteractionPath = '/Interaction/SaveInteraction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveInteraction$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveInteraction$Plain$Response(params?: SaveInteraction$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveInteraction$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveInteraction$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveInteraction$Plain(params?: SaveInteraction$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.saveInteraction$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveInteraction$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveInteraction$Json$Response(params?: SaveInteraction$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveInteraction$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveInteraction$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveInteraction$Json(params?: SaveInteraction$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.saveInteraction$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `deleteInteraction()` */
  static readonly DeleteInteractionPath = '/Interaction/DeleteInteraction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteInteraction$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteInteraction$Plain$Response(params?: DeleteInteraction$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteInteraction$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteInteraction$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteInteraction$Plain(params?: DeleteInteraction$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteInteraction$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteInteraction$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteInteraction$Json$Response(params?: DeleteInteraction$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteInteraction$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteInteraction$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteInteraction$Json(params?: DeleteInteraction$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteInteraction$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
