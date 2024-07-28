/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardListViewModel } from '../../models/card-list-view-model';

export interface GetListOfCardList$Json$Params {
  userId?: number;
}

export function getListOfCardList$Json(http: HttpClient, rootUrl: string, params?: GetListOfCardList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getListOfCardList$Json.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CardListViewModel>>;
    })
  );
}

getListOfCardList$Json.PATH = '/Card/GetListOfCardList';
