/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardViewModel } from '../../models/card-view-model';

export interface GetCardById$Json$Params {
  cardId?: number;
}

export function getCardById$Json(http: HttpClient, rootUrl: string, params?: GetCardById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<CardViewModel>> {
  const rb = new RequestBuilder(rootUrl, getCardById$Json.PATH, 'get');
  if (params) {
    rb.query('cardId', params.cardId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CardViewModel>;
    })
  );
}

getCardById$Json.PATH = '/Card/GetCardById';
