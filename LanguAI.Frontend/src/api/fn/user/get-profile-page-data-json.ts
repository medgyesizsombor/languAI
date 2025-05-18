/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProfilePageDataViewModel } from '../../models/profile-page-data-view-model';

export interface GetProfilePageData$Json$Params {
  userId?: number;
}

export function getProfilePageData$Json(http: HttpClient, rootUrl: string, params?: GetProfilePageData$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<ProfilePageDataViewModel>> {
  const rb = new RequestBuilder(rootUrl, getProfilePageData$Json.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProfilePageDataViewModel>;
    })
  );
}

getProfilePageData$Json.PATH = '/User/GetProfilePageDataById';
