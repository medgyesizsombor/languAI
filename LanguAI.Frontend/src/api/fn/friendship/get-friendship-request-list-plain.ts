/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FriendshipRequestViewModel } from '../../models/friendship-request-view-model';

export interface GetFriendshipRequestList$Plain$Params {
}

export function getFriendshipRequestList$Plain(http: HttpClient, rootUrl: string, params?: GetFriendshipRequestList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<FriendshipRequestViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getFriendshipRequestList$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<FriendshipRequestViewModel>>;
    })
  );
}

getFriendshipRequestList$Plain.PATH = '/Friendship/GetFriendshipRequestList';
