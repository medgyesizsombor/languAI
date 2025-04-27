/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ExerciseViewModel } from '../models/exercise-view-model';
import { getPostCorrectionFromChatGpt$Json } from '../fn/chat-gpt/get-post-correction-from-chat-gpt-json';
import { GetPostCorrectionFromChatGpt$Json$Params } from '../fn/chat-gpt/get-post-correction-from-chat-gpt-json';
import { getPostCorrectionFromChatGpt$Plain } from '../fn/chat-gpt/get-post-correction-from-chat-gpt-plain';
import { GetPostCorrectionFromChatGpt$Plain$Params } from '../fn/chat-gpt/get-post-correction-from-chat-gpt-plain';
import { getPostPhrasing$Json } from '../fn/chat-gpt/get-post-phrasing-json';
import { GetPostPhrasing$Json$Params } from '../fn/chat-gpt/get-post-phrasing-json';
import { getPostPhrasing$Plain } from '../fn/chat-gpt/get-post-phrasing-plain';
import { GetPostPhrasing$Plain$Params } from '../fn/chat-gpt/get-post-phrasing-plain';
import { MessageViewModel } from '../models/message-view-model';
import { receiveExercisesFromChatGpt$Json } from '../fn/chat-gpt/receive-exercises-from-chat-gpt-json';
import { ReceiveExercisesFromChatGpt$Json$Params } from '../fn/chat-gpt/receive-exercises-from-chat-gpt-json';
import { receiveExercisesFromChatGpt$Plain } from '../fn/chat-gpt/receive-exercises-from-chat-gpt-plain';
import { ReceiveExercisesFromChatGpt$Plain$Params } from '../fn/chat-gpt/receive-exercises-from-chat-gpt-plain';
import { receiveMessageFromChatGpt$Json } from '../fn/chat-gpt/receive-message-from-chat-gpt-json';
import { ReceiveMessageFromChatGpt$Json$Params } from '../fn/chat-gpt/receive-message-from-chat-gpt-json';
import { receiveMessageFromChatGpt$Plain } from '../fn/chat-gpt/receive-message-from-chat-gpt-plain';
import { ReceiveMessageFromChatGpt$Plain$Params } from '../fn/chat-gpt/receive-message-from-chat-gpt-plain';
import { sendMessageToChatGpt$Json } from '../fn/chat-gpt/send-message-to-chat-gpt-json';
import { SendMessageToChatGpt$Json$Params } from '../fn/chat-gpt/send-message-to-chat-gpt-json';
import { sendMessageToChatGpt$Plain } from '../fn/chat-gpt/send-message-to-chat-gpt-plain';
import { SendMessageToChatGpt$Plain$Params } from '../fn/chat-gpt/send-message-to-chat-gpt-plain';

@Injectable({ providedIn: 'root' })
export class ChatGptService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `sendMessageToChatGpt()` */
  static readonly SendMessageToChatGptPath = '/ChatGPT/SendMessageToChatGPT';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessageToChatGpt$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessageToChatGpt$Plain$Response(params?: SendMessageToChatGpt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageViewModel>> {
    return sendMessageToChatGpt$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMessageToChatGpt$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessageToChatGpt$Plain(params?: SendMessageToChatGpt$Plain$Params, context?: HttpContext): Observable<MessageViewModel> {
    return this.sendMessageToChatGpt$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageViewModel>): MessageViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessageToChatGpt$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessageToChatGpt$Json$Response(params?: SendMessageToChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageViewModel>> {
    return sendMessageToChatGpt$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMessageToChatGpt$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessageToChatGpt$Json(params?: SendMessageToChatGpt$Json$Params, context?: HttpContext): Observable<MessageViewModel> {
    return this.sendMessageToChatGpt$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageViewModel>): MessageViewModel => r.body)
    );
  }

  /** Path part for operation `receiveMessageFromChatGpt()` */
  static readonly ReceiveMessageFromChatGptPath = '/ChatGPT/ReceiveMessageFromChatGPT';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `receiveMessageFromChatGpt$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiveMessageFromChatGpt$Plain$Response(params?: ReceiveMessageFromChatGpt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageViewModel>> {
    return receiveMessageFromChatGpt$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `receiveMessageFromChatGpt$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiveMessageFromChatGpt$Plain(params?: ReceiveMessageFromChatGpt$Plain$Params, context?: HttpContext): Observable<MessageViewModel> {
    return this.receiveMessageFromChatGpt$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageViewModel>): MessageViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `receiveMessageFromChatGpt$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiveMessageFromChatGpt$Json$Response(params?: ReceiveMessageFromChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageViewModel>> {
    return receiveMessageFromChatGpt$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `receiveMessageFromChatGpt$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiveMessageFromChatGpt$Json(params?: ReceiveMessageFromChatGpt$Json$Params, context?: HttpContext): Observable<MessageViewModel> {
    return this.receiveMessageFromChatGpt$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<MessageViewModel>): MessageViewModel => r.body)
    );
  }

  /** Path part for operation `receiveExercisesFromChatGpt()` */
  static readonly ReceiveExercisesFromChatGptPath = '/ChatGPT/ReceiveExercisesFromChatGPT';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `receiveExercisesFromChatGpt$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiveExercisesFromChatGpt$Plain$Response(params?: ReceiveExercisesFromChatGpt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseViewModel>>> {
    return receiveExercisesFromChatGpt$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `receiveExercisesFromChatGpt$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiveExercisesFromChatGpt$Plain(params?: ReceiveExercisesFromChatGpt$Plain$Params, context?: HttpContext): Observable<Array<ExerciseViewModel>> {
    return this.receiveExercisesFromChatGpt$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExerciseViewModel>>): Array<ExerciseViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `receiveExercisesFromChatGpt$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiveExercisesFromChatGpt$Json$Response(params?: ReceiveExercisesFromChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseViewModel>>> {
    return receiveExercisesFromChatGpt$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `receiveExercisesFromChatGpt$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiveExercisesFromChatGpt$Json(params?: ReceiveExercisesFromChatGpt$Json$Params, context?: HttpContext): Observable<Array<ExerciseViewModel>> {
    return this.receiveExercisesFromChatGpt$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ExerciseViewModel>>): Array<ExerciseViewModel> => r.body)
    );
  }

  /** Path part for operation `getPostCorrectionFromChatGpt()` */
  static readonly GetPostCorrectionFromChatGptPath = '/ChatGPT/GetPostCorrectionFromChatGPT';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostCorrectionFromChatGpt$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostCorrectionFromChatGpt$Plain$Response(params?: GetPostCorrectionFromChatGpt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getPostCorrectionFromChatGpt$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostCorrectionFromChatGpt$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostCorrectionFromChatGpt$Plain(params?: GetPostCorrectionFromChatGpt$Plain$Params, context?: HttpContext): Observable<string> {
    return this.getPostCorrectionFromChatGpt$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostCorrectionFromChatGpt$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostCorrectionFromChatGpt$Json$Response(params?: GetPostCorrectionFromChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getPostCorrectionFromChatGpt$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostCorrectionFromChatGpt$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostCorrectionFromChatGpt$Json(params?: GetPostCorrectionFromChatGpt$Json$Params, context?: HttpContext): Observable<string> {
    return this.getPostCorrectionFromChatGpt$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getPostPhrasing()` */
  static readonly GetPostPhrasingPath = '/ChatGPT/GetPostPhrasing';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostPhrasing$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostPhrasing$Plain$Response(params?: GetPostPhrasing$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getPostPhrasing$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostPhrasing$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostPhrasing$Plain(params?: GetPostPhrasing$Plain$Params, context?: HttpContext): Observable<string> {
    return this.getPostPhrasing$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostPhrasing$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostPhrasing$Json$Response(params?: GetPostPhrasing$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getPostPhrasing$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostPhrasing$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostPhrasing$Json(params?: GetPostPhrasing$Json$Params, context?: HttpContext): Observable<string> {
    return this.getPostPhrasing$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
