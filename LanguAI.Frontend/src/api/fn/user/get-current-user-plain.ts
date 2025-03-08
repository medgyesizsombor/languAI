/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserViewModel } from '../../models/user-view-model';

export interface GetCurrentUser$Plain$Params {
}

export function getCurrentUser$Plain(http: HttpClient, rootUrl: string, params?: GetCurrentUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModel>> {
  const rb = new RequestBuilder(rootUrl, getCurrentUser$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserViewModel>;
    })
  );
}

getCurrentUser$Plain.PATH = '/User/GetCurrentUser';
