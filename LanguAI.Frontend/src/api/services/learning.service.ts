/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { changeActiveLearning$Json } from '../fn/learning/change-active-learning-json';
import { ChangeActiveLearning$Json$Params } from '../fn/learning/change-active-learning-json';
import { changeActiveLearning$Plain } from '../fn/learning/change-active-learning-plain';
import { ChangeActiveLearning$Plain$Params } from '../fn/learning/change-active-learning-plain';
import { getLearningsOfUser$Json } from '../fn/learning/get-learnings-of-user-json';
import { GetLearningsOfUser$Json$Params } from '../fn/learning/get-learnings-of-user-json';
import { getLearningsOfUser$Plain } from '../fn/learning/get-learnings-of-user-plain';
import { GetLearningsOfUser$Plain$Params } from '../fn/learning/get-learnings-of-user-plain';
import { LearningViewModel } from '../models/learning-view-model';
import { saveLearning$Json } from '../fn/learning/save-learning-json';
import { SaveLearning$Json$Params } from '../fn/learning/save-learning-json';
import { saveLearning$Plain } from '../fn/learning/save-learning-plain';
import { SaveLearning$Plain$Params } from '../fn/learning/save-learning-plain';

@Injectable({ providedIn: 'root' })
export class LearningService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveLearning()` */
  static readonly SaveLearningPath = '/Learning/SaveLearning';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLearning$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveLearning$Plain$Response(params?: SaveLearning$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveLearning$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveLearning$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveLearning$Plain(params?: SaveLearning$Plain$Params, context?: HttpContext): Observable<number> {
    return this.saveLearning$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLearning$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveLearning$Json$Response(params?: SaveLearning$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveLearning$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveLearning$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveLearning$Json(params?: SaveLearning$Json$Params, context?: HttpContext): Observable<number> {
    return this.saveLearning$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `getLearningsOfUser()` */
  static readonly GetLearningsOfUserPath = '/Learning/GetLearningsOfUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLearningsOfUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningsOfUser$Plain$Response(params?: GetLearningsOfUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LearningViewModel>>> {
    return getLearningsOfUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLearningsOfUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningsOfUser$Plain(params?: GetLearningsOfUser$Plain$Params, context?: HttpContext): Observable<Array<LearningViewModel>> {
    return this.getLearningsOfUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LearningViewModel>>): Array<LearningViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLearningsOfUser$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningsOfUser$Json$Response(params?: GetLearningsOfUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LearningViewModel>>> {
    return getLearningsOfUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLearningsOfUser$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLearningsOfUser$Json(params?: GetLearningsOfUser$Json$Params, context?: HttpContext): Observable<Array<LearningViewModel>> {
    return this.getLearningsOfUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LearningViewModel>>): Array<LearningViewModel> => r.body)
    );
  }

  /** Path part for operation `changeActiveLearning()` */
  static readonly ChangeActiveLearningPath = '/Learning/ChangeActiveLearning';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeActiveLearning$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeActiveLearning$Plain$Response(params?: ChangeActiveLearning$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return changeActiveLearning$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeActiveLearning$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeActiveLearning$Plain(params?: ChangeActiveLearning$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.changeActiveLearning$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeActiveLearning$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeActiveLearning$Json$Response(params?: ChangeActiveLearning$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return changeActiveLearning$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeActiveLearning$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeActiveLearning$Json(params?: ChangeActiveLearning$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.changeActiveLearning$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
