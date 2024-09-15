/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FriendshipViewModel } from '../../models/friendship-view-model';

export interface GetFriendshipByUserId$Plain$Params {
  currentUserId?: number;
  otherUserId?: number;
}

export function getFriendshipByUserId$Plain(http: HttpClient, rootUrl: string, params?: GetFriendshipByUserId$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FriendshipViewModel>> {
  const rb = new RequestBuilder(rootUrl, getFriendshipByUserId$Plain.PATH, 'get');
  if (params) {
    rb.query('currentUserId', params.currentUserId, {});
    rb.query('otherUserId', params.otherUserId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FriendshipViewModel>;
    })
  );
}

getFriendshipByUserId$Plain.PATH = '/Friendship/GetFriendshipByUserId';
