/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CardViewModel } from '../../models/card-view-model';

export interface GetWordList$Json$Params {
  nativeLanguage?: string;
  learningLanguage?: string;
  level?: string;
  topic?: string;
}

export function getWordList$Json(http: HttpClient, rootUrl: string, params?: GetWordList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CardViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getWordList$Json.PATH, 'post');
  if (params) {
    rb.query('nativeLanguage', params.nativeLanguage, {});
    rb.query('learningLanguage', params.learningLanguage, {});
    rb.query('level', params.level, {});
    rb.query('topic', params.topic, {});
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

getWordList$Json.PATH = '/Card/GetWordList';
