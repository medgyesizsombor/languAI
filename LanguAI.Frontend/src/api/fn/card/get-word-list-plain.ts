/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardViewModel } from '../../models/card-view-model';

export interface GetWordList$Plain$Params {
  nativeLanguage?: string;
  learningLanguage?: string;
  level?: string;
}

export function getWordList$Plain(http: HttpClient, rootUrl: string, params?: GetWordList$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getWordList$Plain.PATH, 'post');
  if (params) {
    rb.query('nativeLanguage', params.nativeLanguage, {});
    rb.query('learningLanguage', params.learningLanguage, {});
    rb.query('level', params.level, {});
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

getWordList$Plain.PATH = '/Card/GetWordList';
