/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardViewModel } from '../../models/card-view-model';

export interface GetCardsOfCardList$Json$Params {
  cardListId?: number;
}

export function getCardsOfCardList$Json(http: HttpClient, rootUrl: string, params?: GetCardsOfCardList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getCardsOfCardList$Json.PATH, 'get');
  if (params) {
    rb.query('cardListId', params.cardListId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CardViewModel>>;
    })
  );
}

getCardsOfCardList$Json.PATH = '/Card/GetCardsOfCardList';
