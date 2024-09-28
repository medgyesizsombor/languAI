/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageViewModel } from '../../models/message-view-model';

export interface ReceiveMessageFromChatGpt$Json$Params {
}

export function receiveMessageFromChatGpt$Json(http: HttpClient, rootUrl: string, params?: ReceiveMessageFromChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageViewModel>> {
  const rb = new RequestBuilder(rootUrl, receiveMessageFromChatGpt$Json.PATH, 'post');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<MessageViewModel>;
    })
  );
}

receiveMessageFromChatGpt$Json.PATH = '/ChatGPT/ReceiveMessageFromChatGPT';
