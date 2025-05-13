/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserDiscoveryViewModel } from '../../models/user-discovery-view-model';

export interface GetListOfDiscoverableUser$Json$Params {
}

export function getListOfDiscoverableUser$Json(http: HttpClient, rootUrl: string, params?: GetListOfDiscoverableUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDiscoveryViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getListOfDiscoverableUser$Json.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserDiscoveryViewModel>>;
    })
  );
}

getListOfDiscoverableUser$Json.PATH = '/Friendship/GetListOfDiscoverableUser';
