/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OtherUserViewModel } from '../../models/other-user-view-model';

export interface GetFriendList$Plain$Params {
  userId?: number;
  isMessagePage?: boolean;
  showChatGPT?: boolean;
}

export function getFriendList$Plain(http: HttpClient, rootUrl: string, params?: GetFriendList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OtherUserViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getFriendList$Plain.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
    rb.query('isMessagePage', params.isMessagePage, {});
    rb.query('showChatGPT', params.showChatGPT, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OtherUserViewModel>>;
    })
  );
}

getFriendList$Plain.PATH = '/Friendship/GetFriendList';
