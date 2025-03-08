/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserViewModel } from '../../models/user-view-model';

export interface GetCurrentUser$Json$Params {
}

export function getCurrentUser$Json(http: HttpClient, rootUrl: string, params?: GetCurrentUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<UserViewModel>> {
  const rb = new RequestBuilder(rootUrl, getCurrentUser$Json.PATH, 'get');
  if (params) {
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

getCurrentUser$Json.PATH = '/User/GetCurrentUser';
