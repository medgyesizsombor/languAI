/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntSelectorModel } from '../../models/int-selector-model';

export interface GetAllLanguage$Json$Params {
  languageCode?: string;
}

export function getAllLanguage$Json(http: HttpClient, rootUrl: string, params?: GetAllLanguage$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
  const rb = new RequestBuilder(rootUrl, getAllLanguage$Json.PATH, 'get');
  if (params) {
    rb.query('languageCode', params.languageCode, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<IntSelectorModel>>;
    })
  );
}

getAllLanguage$Json.PATH = '/Language/GetAllLanguage';
