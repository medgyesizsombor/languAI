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
import { changeAccessOfCardList$Json } from '../fn/card/change-access-of-card-list-json';
import { ChangeAccessOfCardList$Json$Params } from '../fn/card/change-access-of-card-list-json';
import { changeAccessOfCardList$Plain } from '../fn/card/change-access-of-card-list-plain';
import { ChangeAccessOfCardList$Plain$Params } from '../fn/card/change-access-of-card-list-plain';
import { copyCardListOfOtherUser$Json } from '../fn/card/copy-card-list-of-other-user-json';
import { CopyCardListOfOtherUser$Json$Params } from '../fn/card/copy-card-list-of-other-user-json';
import { copyCardListOfOtherUser$Plain } from '../fn/card/copy-card-list-of-other-user-plain';
import { CopyCardListOfOtherUser$Plain$Params } from '../fn/card/copy-card-list-of-other-user-plain';
import { deleteCardById } from '../fn/card/delete-card-by-id';
import { DeleteCardById$Params } from '../fn/card/delete-card-by-id';
import { getAllTopicsByCurrentLearning$Json } from '../fn/card/get-all-topics-by-current-learning-json';
import { GetAllTopicsByCurrentLearning$Json$Params } from '../fn/card/get-all-topics-by-current-learning-json';
import { getAllTopicsByCurrentLearning$Plain } from '../fn/card/get-all-topics-by-current-learning-plain';
import { GetAllTopicsByCurrentLearning$Plain$Params } from '../fn/card/get-all-topics-by-current-learning-plain';
import { getCardById$Json } from '../fn/card/get-card-by-id-json';
import { GetCardById$Json$Params } from '../fn/card/get-card-by-id-json';
import { getCardById$Plain } from '../fn/card/get-card-by-id-plain';
import { GetCardById$Plain$Params } from '../fn/card/get-card-by-id-plain';
import { getCardListById$Json } from '../fn/card/get-card-list-by-id-json';
import { GetCardListById$Json$Params } from '../fn/card/get-card-list-by-id-json';
import { getCardListById$Plain } from '../fn/card/get-card-list-by-id-plain';
import { GetCardListById$Plain$Params } from '../fn/card/get-card-list-by-id-plain';
import { getCardListOfCurrentLearningGroupByTopic$Json } from '../fn/card/get-card-list-of-current-learning-group-by-topic-json';
import { GetCardListOfCurrentLearningGroupByTopic$Json$Params } from '../fn/card/get-card-list-of-current-learning-group-by-topic-json';
import { getCardListOfCurrentLearningGroupByTopic$Plain } from '../fn/card/get-card-list-of-current-learning-group-by-topic-plain';
import { GetCardListOfCurrentLearningGroupByTopic$Plain$Params } from '../fn/card/get-card-list-of-current-learning-group-by-topic-plain';
import { getCardListsOfCurrentUser$Json } from '../fn/card/get-card-lists-of-current-user-json';
import { GetCardListsOfCurrentUser$Json$Params } from '../fn/card/get-card-lists-of-current-user-json';
import { getCardListsOfCurrentUser$Plain } from '../fn/card/get-card-lists-of-current-user-plain';
import { GetCardListsOfCurrentUser$Plain$Params } from '../fn/card/get-card-lists-of-current-user-plain';
import { getCardListsOfOtherUserByUserId$Json } from '../fn/card/get-card-lists-of-other-user-by-user-id-json';
import { GetCardListsOfOtherUserByUserId$Json$Params } from '../fn/card/get-card-lists-of-other-user-by-user-id-json';
import { getCardListsOfOtherUserByUserId$Plain } from '../fn/card/get-card-lists-of-other-user-by-user-id-plain';
import { GetCardListsOfOtherUserByUserId$Plain$Params } from '../fn/card/get-card-lists-of-other-user-by-user-id-plain';
import { getCardsOfCardList$Json } from '../fn/card/get-cards-of-card-list-json';
import { GetCardsOfCardList$Json$Params } from '../fn/card/get-cards-of-card-list-json';
import { getCardsOfCardList$Plain } from '../fn/card/get-cards-of-card-list-plain';
import { GetCardsOfCardList$Plain$Params } from '../fn/card/get-cards-of-card-list-plain';
import { getWordList$Json } from '../fn/card/get-word-list-json';
import { GetWordList$Json$Params } from '../fn/card/get-word-list-json';
import { getWordList$Plain } from '../fn/card/get-word-list-plain';
import { GetWordList$Plain$Params } from '../fn/card/get-word-list-plain';
import { IntSelectorModel } from '../models/int-selector-model';
import { saveCard } from '../fn/card/save-card';
import { SaveCard$Params } from '../fn/card/save-card';
import { saveCardList$Json } from '../fn/card/save-card-list-json';
import { SaveCardList$Json$Params } from '../fn/card/save-card-list-json';
import { saveCardList$Plain } from '../fn/card/save-card-list-plain';
import { SaveCardList$Plain$Params } from '../fn/card/save-card-list-plain';
import { saveCards$Json } from '../fn/card/save-cards-json';
import { SaveCards$Json$Params } from '../fn/card/save-cards-json';
import { saveCards$Plain } from '../fn/card/save-cards-plain';
import { SaveCards$Plain$Params } from '../fn/card/save-cards-plain';
import { TopicOfCurrentLearningViewModel } from '../models/topic-of-current-learning-view-model';

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

  /** Path part for operation `getCardListsOfCurrentUser()` */
  static readonly GetCardListsOfCurrentUserPath = '/Card/GetCardListsOfCurrentUser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListsOfCurrentUser$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfCurrentUser$Plain$Response(params?: GetCardListsOfCurrentUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
    return getCardListsOfCurrentUser$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListsOfCurrentUser$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfCurrentUser$Plain(params?: GetCardListsOfCurrentUser$Plain$Params, context?: HttpContext): Observable<Array<CardListViewModel>> {
    return this.getCardListsOfCurrentUser$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CardListViewModel>>): Array<CardListViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListsOfCurrentUser$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfCurrentUser$Json$Response(params?: GetCardListsOfCurrentUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
    return getCardListsOfCurrentUser$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListsOfCurrentUser$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListsOfCurrentUser$Json(params?: GetCardListsOfCurrentUser$Json$Params, context?: HttpContext): Observable<Array<CardListViewModel>> {
    return this.getCardListsOfCurrentUser$Json$Response(params, context).pipe(
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

  /** Path part for operation `changeAccessOfCardList()` */
  static readonly ChangeAccessOfCardListPath = '/Card/ChangeAccessOfCardList';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeAccessOfCardList$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  changeAccessOfCardList$Plain$Response(params?: ChangeAccessOfCardList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return changeAccessOfCardList$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeAccessOfCardList$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  changeAccessOfCardList$Plain(params?: ChangeAccessOfCardList$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.changeAccessOfCardList$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeAccessOfCardList$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  changeAccessOfCardList$Json$Response(params?: ChangeAccessOfCardList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return changeAccessOfCardList$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `changeAccessOfCardList$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  changeAccessOfCardList$Json(params?: ChangeAccessOfCardList$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.changeAccessOfCardList$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getCardListOfCurrentLearningGroupByTopic()` */
  static readonly GetCardListOfCurrentLearningGroupByTopicPath = '/Card/GetCardListOfCurrentLearningGroupByTopic';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListOfCurrentLearningGroupByTopic$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListOfCurrentLearningGroupByTopic$Plain$Response(params?: GetCardListOfCurrentLearningGroupByTopic$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TopicOfCurrentLearningViewModel>>> {
    return getCardListOfCurrentLearningGroupByTopic$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListOfCurrentLearningGroupByTopic$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListOfCurrentLearningGroupByTopic$Plain(params?: GetCardListOfCurrentLearningGroupByTopic$Plain$Params, context?: HttpContext): Observable<Array<TopicOfCurrentLearningViewModel>> {
    return this.getCardListOfCurrentLearningGroupByTopic$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TopicOfCurrentLearningViewModel>>): Array<TopicOfCurrentLearningViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardListOfCurrentLearningGroupByTopic$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListOfCurrentLearningGroupByTopic$Json$Response(params?: GetCardListOfCurrentLearningGroupByTopic$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TopicOfCurrentLearningViewModel>>> {
    return getCardListOfCurrentLearningGroupByTopic$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardListOfCurrentLearningGroupByTopic$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardListOfCurrentLearningGroupByTopic$Json(params?: GetCardListOfCurrentLearningGroupByTopic$Json$Params, context?: HttpContext): Observable<Array<TopicOfCurrentLearningViewModel>> {
    return this.getCardListOfCurrentLearningGroupByTopic$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TopicOfCurrentLearningViewModel>>): Array<TopicOfCurrentLearningViewModel> => r.body)
    );
  }

  /** Path part for operation `getCardById()` */
  static readonly GetCardByIdPath = '/Card/GetCardById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardById$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardById$Plain$Response(params?: GetCardById$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<CardViewModel>> {
    return getCardById$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardById$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardById$Plain(params?: GetCardById$Plain$Params, context?: HttpContext): Observable<CardViewModel> {
    return this.getCardById$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<CardViewModel>): CardViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCardById$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardById$Json$Response(params?: GetCardById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CardViewModel>> {
    return getCardById$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCardById$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCardById$Json(params?: GetCardById$Json$Params, context?: HttpContext): Observable<CardViewModel> {
    return this.getCardById$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<CardViewModel>): CardViewModel => r.body)
    );
  }

  /** Path part for operation `deleteCardById()` */
  static readonly DeleteCardByIdPath = '/Card/DeleteCardById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCardById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCardById$Response(params?: DeleteCardById$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteCardById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCardById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCardById(params?: DeleteCardById$Params, context?: HttpContext): Observable<void> {
    return this.deleteCardById$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllTopicsByCurrentLearning()` */
  static readonly GetAllTopicsByCurrentLearningPath = '/Card/GetAllTopicsByCurrentLearning';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTopicsByCurrentLearning$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTopicsByCurrentLearning$Plain$Response(params?: GetAllTopicsByCurrentLearning$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
    return getAllTopicsByCurrentLearning$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTopicsByCurrentLearning$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTopicsByCurrentLearning$Plain(params?: GetAllTopicsByCurrentLearning$Plain$Params, context?: HttpContext): Observable<Array<IntSelectorModel>> {
    return this.getAllTopicsByCurrentLearning$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<IntSelectorModel>>): Array<IntSelectorModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTopicsByCurrentLearning$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTopicsByCurrentLearning$Json$Response(params?: GetAllTopicsByCurrentLearning$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
    return getAllTopicsByCurrentLearning$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTopicsByCurrentLearning$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTopicsByCurrentLearning$Json(params?: GetAllTopicsByCurrentLearning$Json$Params, context?: HttpContext): Observable<Array<IntSelectorModel>> {
    return this.getAllTopicsByCurrentLearning$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<IntSelectorModel>>): Array<IntSelectorModel> => r.body)
    );
  }

  /** Path part for operation `saveCard()` */
  static readonly SaveCardPath = '/Card/SaveCard';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveCard()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCard$Response(params?: SaveCard$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return saveCard(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveCard$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  saveCard(params?: SaveCard$Params, context?: HttpContext): Observable<void> {
    return this.saveCard$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
