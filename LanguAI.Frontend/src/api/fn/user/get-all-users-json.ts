/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserViewModel } from '../../models/user-view-model';

export interface GetAllUsers$Json$Params {
}

export function getAllUsers$Json(http: HttpClient, rootUrl: string, params?: GetAllUsers$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getAllUsers$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserViewModel>>;
    })
  );
}

getAllUsers$Json.PATH = '/User/GetAllUsers';
