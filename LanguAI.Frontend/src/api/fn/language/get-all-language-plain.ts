/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntSelectorModel } from '../../models/int-selector-model';

export interface GetAllLanguage$Plain$Params {
  languageCode?: string;
}

export function getAllLanguage$Plain(http: HttpClient, rootUrl: string, params?: GetAllLanguage$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
  const rb = new RequestBuilder(rootUrl, getAllLanguage$Plain.PATH, 'get');
  if (params) {
    rb.query('languageCode', params.languageCode, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<IntSelectorModel>>;
    })
  );
}

getAllLanguage$Plain.PATH = '/Language/GetAllLanguage';
