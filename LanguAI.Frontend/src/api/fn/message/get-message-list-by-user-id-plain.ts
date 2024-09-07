/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { MessageViewModel } from '../../models/message-view-model';

export interface GetMessageListByUserId$Plain$Params {
  friendId?: number;
}

export function getMessageListByUserId$Plain(http: HttpClient, rootUrl: string, params?: GetMessageListByUserId$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<MessageViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getMessageListByUserId$Plain.PATH, 'get');
  if (params) {
    rb.query('friendId', params.friendId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<MessageViewModel>>;
    })
  );
}

getMessageListByUserId$Plain.PATH = '/Message/GetMessageListByUserId';
