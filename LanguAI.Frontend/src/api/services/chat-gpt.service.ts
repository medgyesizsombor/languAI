/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { MessageViewModel } from '../models/message-view-model';
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

}
