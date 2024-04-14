/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserViewModel } from '../../models/user-view-model';

export interface GetUserById$Json$Params {
  userId?: number;
}

export function getUserById$Json(http: HttpClient, rootUrl: string, params?: GetUserById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModel>> {
  const rb = new RequestBuilder(rootUrl, getUserById$Json.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserViewModel>;
    })
  );
}

getUserById$Json.PATH = '/User/GetUserById';
