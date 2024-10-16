/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserViewModel } from '../../models/user-view-model';

export interface GetAllUsers$Plain$Params {
}

export function getAllUsers$Plain(http: HttpClient, rootUrl: string, params?: GetAllUsers$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getAllUsers$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserViewModel>>;
    })
  );
}

getAllUsers$Plain.PATH = '/User/GetAllUsers';
