/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getWeeklyLeaderboard$Json } from '../fn/gameplay/get-weekly-leaderboard-json';
import { GetWeeklyLeaderboard$Json$Params } from '../fn/gameplay/get-weekly-leaderboard-json';
import { getWeeklyLeaderboard$Plain } from '../fn/gameplay/get-weekly-leaderboard-plain';
import { GetWeeklyLeaderboard$Plain$Params } from '../fn/gameplay/get-weekly-leaderboard-plain';
import { LeaderboardUserViewModel } from '../models/leaderboard-user-view-model';
import { saveGameplay$Json } from '../fn/gameplay/save-gameplay-json';
import { SaveGameplay$Json$Params } from '../fn/gameplay/save-gameplay-json';
import { saveGameplay$Plain } from '../fn/gameplay/save-gameplay-plain';
import { SaveGameplay$Plain$Params } from '../fn/gameplay/save-gameplay-plain';

@Injectable({ providedIn: 'root' })
export class GameplayService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `saveGameplay()` */
  static readonly SaveGameplayPath = '/Gameplay/SaveGameplay';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGameplay$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveGameplay$Plain$Response(params?: SaveGameplay$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveGameplay$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGameplay$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveGameplay$Plain(params?: SaveGameplay$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.saveGameplay$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveGameplay$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveGameplay$Json$Response(params?: SaveGameplay$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveGameplay$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveGameplay$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveGameplay$Json(params?: SaveGameplay$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.saveGameplay$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getWeeklyLeaderboard()` */
  static readonly GetWeeklyLeaderboardPath = '/Gameplay/GetWeeklyLeaderboard';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWeeklyLeaderboard$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeeklyLeaderboard$Plain$Response(params?: GetWeeklyLeaderboard$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LeaderboardUserViewModel>>> {
    return getWeeklyLeaderboard$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWeeklyLeaderboard$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeeklyLeaderboard$Plain(params?: GetWeeklyLeaderboard$Plain$Params, context?: HttpContext): Observable<Array<LeaderboardUserViewModel>> {
    return this.getWeeklyLeaderboard$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LeaderboardUserViewModel>>): Array<LeaderboardUserViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWeeklyLeaderboard$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeeklyLeaderboard$Json$Response(params?: GetWeeklyLeaderboard$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LeaderboardUserViewModel>>> {
    return getWeeklyLeaderboard$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWeeklyLeaderboard$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWeeklyLeaderboard$Json(params?: GetWeeklyLeaderboard$Json$Params, context?: HttpContext): Observable<Array<LeaderboardUserViewModel>> {
    return this.getWeeklyLeaderboard$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LeaderboardUserViewModel>>): Array<LeaderboardUserViewModel> => r.body)
    );
  }

}
