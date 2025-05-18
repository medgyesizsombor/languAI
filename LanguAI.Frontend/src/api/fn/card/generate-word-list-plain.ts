/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardViewModel } from '../../models/card-view-model';

export interface GenerateWordList$Plain$Params {
  cardListId?: number;
}

export function generateWordList$Plain(http: HttpClient, rootUrl: string, params?: GenerateWordList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardViewModel>>> {
  const rb = new RequestBuilder(rootUrl, generateWordList$Plain.PATH, 'post');
  if (params) {
    rb.query('cardListId', params.cardListId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CardViewModel>>;
    })
  );
}

generateWordList$Plain.PATH = '/Card/GenerateWordList';
