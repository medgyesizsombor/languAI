/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardListViewModel } from '../../models/card-list-view-model';

export interface GetListOfCardList$Plain$Params {
  userId?: number;
}

export function getListOfCardList$Plain(http: HttpClient, rootUrl: string, params?: GetListOfCardList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getListOfCardList$Plain.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CardListViewModel>>;
    })
  );
}

getListOfCardList$Plain.PATH = '/Card/GetListOfCardList';
