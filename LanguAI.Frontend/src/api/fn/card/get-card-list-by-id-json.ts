/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardListViewModel } from '../../models/card-list-view-model';

export interface GetCardListById$Json$Params {
  cardListId?: number;
}

export function getCardListById$Json(http: HttpClient, rootUrl: string, params?: GetCardListById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CardListViewModel>> {
  const rb = new RequestBuilder(rootUrl, getCardListById$Json.PATH, 'get');
  if (params) {
    rb.query('cardListId', params.cardListId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CardListViewModel>;
    })
  );
}

getCardListById$Json.PATH = '/Card/GetCardListById';
