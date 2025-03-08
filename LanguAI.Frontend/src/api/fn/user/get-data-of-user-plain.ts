/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserDataViewModel } from '../../models/user-data-view-model';

export interface GetDataOfUser$Plain$Params {
}

export function getDataOfUser$Plain(http: HttpClient, rootUrl: string, params?: GetDataOfUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDataViewModel>> {
  const rb = new RequestBuilder(rootUrl, getDataOfUser$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UserDataViewModel>;
    })
  );
}

getDataOfUser$Plain.PATH = '/User/GetDataOfUser';
