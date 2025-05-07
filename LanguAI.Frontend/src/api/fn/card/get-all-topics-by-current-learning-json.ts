/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { IntSelectorModel } from '../../models/int-selector-model';

export interface GetAllTopicsByCurrentLearning$Json$Params {
  learningId?: number;
}

export function getAllTopicsByCurrentLearning$Json(http: HttpClient, rootUrl: string, params?: GetAllTopicsByCurrentLearning$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
  const rb = new RequestBuilder(rootUrl, getAllTopicsByCurrentLearning$Json.PATH, 'get');
  if (params) {
    rb.query('learningId', params.learningId, {});
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

getAllTopicsByCurrentLearning$Json.PATH = '/Card/GetAllTopicsByCurrentLearning';
