/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardListViewModel } from '../../models/card-list-view-model';

export interface GetCardListsOfOtherUserByUserId$Plain$Params {
  userId?: number;
  otherUserId?: number;
}

export function getCardListsOfOtherUserByUserId$Plain(http: HttpClient, rootUrl: string, params?: GetCardListsOfOtherUserByUserId$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardListViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getCardListsOfOtherUserByUserId$Plain.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
    rb.query('otherUserId', params.otherUserId, {});
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

getCardListsOfOtherUserByUserId$Plain.PATH = '/Card/GetCardListsOfOtherUserByUserId';
