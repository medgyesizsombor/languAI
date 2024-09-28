/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageViewModel } from '../../models/message-view-model';

export interface SendMessageToChatGpt$Json$Params {
      body?: MessageViewModel
}

export function sendMessageToChatGpt$Json(http: HttpClient, rootUrl: string, params?: SendMessageToChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<MessageViewModel>> {
  const rb = new RequestBuilder(rootUrl, sendMessageToChatGpt$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
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

sendMessageToChatGpt$Json.PATH = '/ChatGPT/SendMessageToChatGPT';
