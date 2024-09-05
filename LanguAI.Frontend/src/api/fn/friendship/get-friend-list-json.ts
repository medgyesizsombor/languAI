/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntSelectorModel } from '../../models/int-selector-model';

export interface GetFriendList$Json$Params {
  userId?: number;
}

export function getFriendList$Json(http: HttpClient, rootUrl: string, params?: GetFriendList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
  const rb = new RequestBuilder(rootUrl, getFriendList$Json.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<IntSelectorModel>>;
    })
  );
}

getFriendList$Json.PATH = '/Friendship/GetFriendList';
