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
import { copyCardListOfOtherUser$Json } from '../fn/card/copy-card-list-of-other-user-json';
import { CopyCardListOfOtherUser$Json$Params } from '../fn/card/copy-card-list-of-other-user-json';
import { copyCardListOfOtherUser$Plain } from '../fn/card/copy-card-list-of-other-user-plain';
import { CopyCardListOfOtherUser$Plain$Params } from '../fn/card/copy-card-list-of-other-user-plain';
import { getCardListById$Json } from '../fn/card/get-card-list-by-id-json';
import { GetCardListById$Json$Params } from '../fn/card/get-card-list-by-id-json';
import { getCardListById$Plain } from '../fn/card/get-card-list-by-id-plain';
import { GetCardListById$Plain$Params } from '../fn/card/get-card-list-by-id-plain';
import { getCardListsOfOtherUserByUserId$Json } from '../fn/card/get-card-lists-of-other-user-by-user-id-json';
import { GetCardListsOfOtherUserByUserId$Json$Params } from '../fn/card/get-card-lists-of-other-user-by-user-id-json';
import { getCardListsOfOtherUserByUserId$Plain } from '../fn/card/get-card-lists-of-other-user-by-user-id-plain';
import { GetCardListsOfOtherUserByUserId$Plain$Params } from '../fn/card/get-card-lists-of-other-user-by-user-id-plain';
import { getCardListsOfOtherUsers$Json } from '../fn/card/get-card-lists-of-other-users-json';
import { GetCardListsOfOtherUsers$Json$Params } from '../fn/card/get-card-lists-of-other-users-json';
import { getCardListsOfOtherUsers$Plain } from '../fn/card/get-card-lists-of-other-users-plain';
import { GetCardListsOfOtherUsers$Plain$Params } from '../fn/card/get-card-lists-of-other-users-plain';
import { getCardsOfCardList$Json } from '../fn/card/get-cards-of-card-list-json';
import { GetCardsOfCardList$Json$Params } from '../fn/card/get-cards-of-card-list-json';
import { getCardsOfCardList$Plain } from '../fn/card/get-cards-of-card-list-plain';
import { GetCardsOfCardList$Plain$Params } from '../fn/card/get-cards-of-card-list-plain';
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
import { saveCards$Json } from '../fn/card/save-cards-json';
import { SaveCards$Json$Params } from '../fn/card/save-cards-json';
import { saveCards$Plain } from '../fn/card/save-cards-plain';
import { SaveCards$Plain$Params } from '../fn/card/save-cards-plain';

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

  /** Path part for operation `saveCards()` */
  static readonly SaveCardsPath = '/Card/SaveCards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCards$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCards$Plain$Response(params?: SaveCards$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveCards$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCards$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCards$Plain(params?: SaveCards$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.saveCards$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCards$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCards$Json$Response(params?: SaveCards$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return saveCards$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCards$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCards$Json(params?: SaveCards$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.saveCards$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
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
  saveCardList$Plain$Response(params?: SaveCardList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveCardList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCardList$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCardList$Plain(params?: SaveCardList$Plain$Params, context?: HttpContext): Observable<number> {
    return this.saveCardList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCardList$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCardList$Json$Response(params?: SaveCardList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveCardList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCardList$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCardList$Json(params?: SaveCardList$Json$Params, context?: HttpContext): Observable<number> {
    return this.saveCardList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
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

  /** Path part for operation `getCardsOfCardList()` */
  static readonly GetCardsOfCardListPath = '/Card/GetCardsOfCardList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardsOfCardList$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardsOfCardList$Plain$Response(params?: GetCardsOfCardList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardViewModel>>> {
    return getCardsOfCardList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardsOfCardList$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardsOfCardList$Plain(params?: GetCardsOfCardList$Plain$Params, context?: HttpContext): Observable<Array<CardViewModel>> {
    return this.getCardsOfCardList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardViewModel>>): Array<CardViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardsOfCardList$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardsOfCardList$Json$Response(params?: GetCardsOfCardList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardViewModel>>> {
    return getCardsOfCardList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardsOfCardList$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardsOfCardList$Json(params?: GetCardsOfCardList$Json$Params, context?: HttpContext): Observable<Array<CardViewModel>> {
    return this.getCardsOfCardList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardViewModel>>): Array<CardViewModel> => r.body)
    );
  }

  /** Path part for operation `getCardListById()` */
  static readonly GetCardListByIdPath = '/Card/GetCardListById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListById$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListById$Plain$Response(params?: GetCardListById$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CardListViewModel>> {
    return getCardListById$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListById$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListById$Plain(params?: GetCardListById$Plain$Params, context?: HttpContext): Observable<CardListViewModel> {
    return this.getCardListById$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CardListViewModel>): CardListViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListById$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListById$Json$Response(params?: GetCardListById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CardListViewModel>> {
    return getCardListById$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListById$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListById$Json(params?: GetCardListById$Json$Params, context?: HttpContext): Observable<CardListViewModel> {
    return this.getCardListById$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CardListViewModel>): CardListViewModel => r.body)
    );
  }

  /** Path part for operation `getCardListsOfOtherUsers()` */
  static readonly GetCardListsOfOtherUsersPath = '/Card/GetCardListsOfOtherUsers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListsOfOtherUsers$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfOtherUsers$Plain$Response(params?: GetCardListsOfOtherUsers$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
    return getCardListsOfOtherUsers$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListsOfOtherUsers$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfOtherUsers$Plain(params?: GetCardListsOfOtherUsers$Plain$Params, context?: HttpContext): Observable<Array<CardListViewModel>> {
    return this.getCardListsOfOtherUsers$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardListViewModel>>): Array<CardListViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListsOfOtherUsers$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfOtherUsers$Json$Response(params?: GetCardListsOfOtherUsers$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
    return getCardListsOfOtherUsers$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListsOfOtherUsers$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfOtherUsers$Json(params?: GetCardListsOfOtherUsers$Json$Params, context?: HttpContext): Observable<Array<CardListViewModel>> {
    return this.getCardListsOfOtherUsers$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardListViewModel>>): Array<CardListViewModel> => r.body)
    );
  }

  /** Path part for operation `getCardListsOfOtherUserByUserId()` */
  static readonly GetCardListsOfOtherUserByUserIdPath = '/Card/GetCardListsOfOtherUserByUserId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListsOfOtherUserByUserId$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfOtherUserByUserId$Plain$Response(params?: GetCardListsOfOtherUserByUserId$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
    return getCardListsOfOtherUserByUserId$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListsOfOtherUserByUserId$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfOtherUserByUserId$Plain(params?: GetCardListsOfOtherUserByUserId$Plain$Params, context?: HttpContext): Observable<Array<CardListViewModel>> {
    return this.getCardListsOfOtherUserByUserId$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardListViewModel>>): Array<CardListViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListsOfOtherUserByUserId$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfOtherUserByUserId$Json$Response(params?: GetCardListsOfOtherUserByUserId$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
    return getCardListsOfOtherUserByUserId$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListsOfOtherUserByUserId$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfOtherUserByUserId$Json(params?: GetCardListsOfOtherUserByUserId$Json$Params, context?: HttpContext): Observable<Array<CardListViewModel>> {
    return this.getCardListsOfOtherUserByUserId$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardListViewModel>>): Array<CardListViewModel> => r.body)
    );
  }

  /** Path part for operation `copyCardListOfOtherUser()` */
  static readonly CopyCardListOfOtherUserPath = '/Card/CopyCardListOfOtherUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `copyCardListOfOtherUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  copyCardListOfOtherUser$Plain$Response(params?: CopyCardListOfOtherUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return copyCardListOfOtherUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `copyCardListOfOtherUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  copyCardListOfOtherUser$Plain(params?: CopyCardListOfOtherUser$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.copyCardListOfOtherUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `copyCardListOfOtherUser$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  copyCardListOfOtherUser$Json$Response(params?: CopyCardListOfOtherUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return copyCardListOfOtherUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `copyCardListOfOtherUser$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  copyCardListOfOtherUser$Json(params?: CopyCardListOfOtherUser$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.copyCardListOfOtherUser$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
