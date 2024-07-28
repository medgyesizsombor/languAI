/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CardListViewModel } from '../models/card-list-view-model';
import { CardViewModel } from '../models/card-view-model';
import { getListOfCardList$Json } from '../fn/card/get-list-of-card-list-json';
import { GetListOfCardList$Json$Params } from '../fn/card/get-list-of-card-list-json';
import { getListOfCardList$Plain } from '../fn/card/get-list-of-card-list-plain';
import { GetListOfCardList$Plain$Params } from '../fn/card/get-list-of-card-list-plain';
import { getWordList$Json } from '../fn/card/get-word-list-json';
import { GetWordList$Json$Params } from '../fn/card/get-word-list-json';
import { getWordList$Plain } from '../fn/card/get-word-list-plain';
import { GetWordList$Plain$Params } from '../fn/card/get-word-list-plain';
import { saveCardList$Json } from '../fn/card/save-card-list-json';
import { SaveCardList$Json$Params } from '../fn/card/save-card-list-json';
import { saveCardList$Plain } from '../fn/card/save-card-list-plain';
import { SaveCardList$Plain$Params } from '../fn/card/save-card-list-plain';

@Injectable({ providedIn: 'root' })
export class CardService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getWordList()` */
  static readonly GetWordListPath = '/Card/GetWordList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWordList$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWordList$Plain$Response(params?: GetWordList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardViewModel>>> {
    return getWordList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWordList$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWordList$Plain(params?: GetWordList$Plain$Params, context?: HttpContext): Observable<Array<CardViewModel>> {
    return this.getWordList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardViewModel>>): Array<CardViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWordList$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWordList$Json$Response(params?: GetWordList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardViewModel>>> {
    return getWordList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWordList$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWordList$Json(params?: GetWordList$Json$Params, context?: HttpContext): Observable<Array<CardViewModel>> {
    return this.getWordList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardViewModel>>): Array<CardViewModel> => r.body)
    );
  }

  /** Path part for operation `saveCardList()` */
  static readonly SaveCardListPath = '/Card/SaveCardList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCardList$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCardList$Plain$Response(params?: SaveCardList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveCardList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCardList$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCardList$Plain(params?: SaveCardList$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.saveCardList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCardList$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCardList$Json$Response(params?: SaveCardList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveCardList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCardList$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCardList$Json(params?: SaveCardList$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.saveCardList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getListOfCardList()` */
  static readonly GetListOfCardListPath = '/Card/GetListOfCardList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getListOfCardList$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListOfCardList$Plain$Response(params?: GetListOfCardList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
    return getListOfCardList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getListOfCardList$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListOfCardList$Plain(params?: GetListOfCardList$Plain$Params, context?: HttpContext): Observable<Array<CardListViewModel>> {
    return this.getListOfCardList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardListViewModel>>): Array<CardListViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getListOfCardList$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListOfCardList$Json$Response(params?: GetListOfCardList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
    return getListOfCardList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getListOfCardList$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getListOfCardList$Json(params?: GetListOfCardList$Json$Params, context?: HttpContext): Observable<Array<CardListViewModel>> {
    return this.getListOfCardList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardListViewModel>>): Array<CardListViewModel> => r.body)
    );
  }

}
