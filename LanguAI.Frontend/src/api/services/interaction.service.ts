/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteComment$Json } from '../fn/interaction/delete-comment-json';
import { DeleteComment$Json$Params } from '../fn/interaction/delete-comment-json';
import { deleteComment$Plain } from '../fn/interaction/delete-comment-plain';
import { DeleteComment$Plain$Params } from '../fn/interaction/delete-comment-plain';
import { dislike$Json } from '../fn/interaction/dislike-json';
import { Dislike$Json$Params } from '../fn/interaction/dislike-json';
import { dislike$Plain } from '../fn/interaction/dislike-plain';
import { Dislike$Plain$Params } from '../fn/interaction/dislike-plain';
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

  /** Path part for operation `dislike()` */
  static readonly DislikePath = '/Interaction/Dislike';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dislike$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dislike$Plain$Response(params?: Dislike$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return dislike$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dislike$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dislike$Plain(params?: Dislike$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.dislike$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dislike$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dislike$Json$Response(params?: Dislike$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return dislike$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dislike$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  dislike$Json(params?: Dislike$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.dislike$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `deleteComment()` */
  static readonly DeleteCommentPath = '/Interaction/DeleteComment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComment$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteComment$Plain$Response(params?: DeleteComment$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteComment$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteComment$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteComment$Plain(params?: DeleteComment$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteComment$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteComment$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteComment$Json$Response(params?: DeleteComment$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteComment$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteComment$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  deleteComment$Json(params?: DeleteComment$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteComment$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
