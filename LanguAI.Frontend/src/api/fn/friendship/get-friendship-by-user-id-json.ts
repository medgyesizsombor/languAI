/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FriendshipViewModel } from '../../models/friendship-view-model';

export interface GetFriendshipByUserId$Json$Params {
  otherUserId?: number;
}

export function getFriendshipByUserId$Json(http: HttpClient, rootUrl: string, params?: GetFriendshipByUserId$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FriendshipViewModel>> {
  const rb = new RequestBuilder(rootUrl, getFriendshipByUserId$Json.PATH, 'get');
  if (params) {
    rb.query('otherUserId', params.otherUserId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FriendshipViewModel>;
    })
  );
}

getFriendshipByUserId$Json.PATH = '/Friendship/GetFriendshipByUserId';
