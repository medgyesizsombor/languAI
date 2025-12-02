/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getMessageListByUserId$Json } from '../fn/message/get-message-list-by-user-id-json';
import { GetMessageListByUserId$Json$Params } from '../fn/message/get-message-list-by-user-id-json';
import { getMessageListByUserId$Plain } from '../fn/message/get-message-list-by-user-id-plain';
import { GetMessageListByUserId$Plain$Params } from '../fn/message/get-message-list-by-user-id-plain';
import { MessageViewModel } from '../models/message-view-model';
import { sendMessage$Json } from '../fn/message/send-message-json';
import { SendMessage$Json$Params } from '../fn/message/send-message-json';
import { sendMessage$Plain } from '../fn/message/send-message-plain';
import { SendMessage$Plain$Params } from '../fn/message/send-message-plain';
import { sendMessageToChatGpt$Json } from '../fn/message/send-message-to-chat-gpt-json';
import { SendMessageToChatGpt$Json$Params } from '../fn/message/send-message-to-chat-gpt-json';
import { sendMessageToChatGpt$Plain } from '../fn/message/send-message-to-chat-gpt-plain';
import { SendMessageToChatGpt$Plain$Params } from '../fn/message/send-message-to-chat-gpt-plain';

@Injectable({ providedIn: 'root' })
export class MessageService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `sendMessage()` */
  static readonly SendMessagePath = '/Message/SendMessage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessage$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessage$Plain$Response(params?: SendMessage$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return sendMessage$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMessage$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessage$Plain(params?: SendMessage$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.sendMessage$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessage$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessage$Json$Response(params?: SendMessage$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return sendMessage$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMessage$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  sendMessage$Json(params?: SendMessage$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.sendMessage$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getMessageListByUserId()` */
  static readonly GetMessageListByUserIdPath = '/Message/GetMessageListByUserId';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMessageListByUserId$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMessageListByUserId$Plain$Response(params?: GetMessageListByUserId$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MessageViewModel>>> {
    return getMessageListByUserId$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMessageListByUserId$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMessageListByUserId$Plain(params?: GetMessageListByUserId$Plain$Params, context?: HttpContext): Observable<Array<MessageViewModel>> {
    return this.getMessageListByUserId$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MessageViewModel>>): Array<MessageViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMessageListByUserId$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMessageListByUserId$Json$Response(params?: GetMessageListByUserId$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MessageViewModel>>> {
    return getMessageListByUserId$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getMessageListByUserId$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMessageListByUserId$Json(params?: GetMessageListByUserId$Json$Params, context?: HttpContext): Observable<Array<MessageViewModel>> {
    return this.getMessageListByUserId$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<MessageViewModel>>): Array<MessageViewModel> => r.body)
    );
  }

  /** Path part for operation `sendMessageToChatGpt()` */
  static readonly SendMessageToChatGptPath = '/Message/SendMessageToChatGPT';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessageToChatGpt$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendMessageToChatGpt$Plain$Response(params?: SendMessageToChatGpt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return sendMessageToChatGpt$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMessageToChatGpt$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendMessageToChatGpt$Plain(params?: SendMessageToChatGpt$Plain$Params, context?: HttpContext): Observable<string> {
    return this.sendMessageToChatGpt$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendMessageToChatGpt$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendMessageToChatGpt$Json$Response(params?: SendMessageToChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return sendMessageToChatGpt$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendMessageToChatGpt$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendMessageToChatGpt$Json(params?: SendMessageToChatGpt$Json$Params, context?: HttpContext): Observable<string> {
    return this.sendMessageToChatGpt$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
