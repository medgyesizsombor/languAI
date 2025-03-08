/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LearningViewModel } from '../../models/learning-view-model';

export interface GetLearningsOfUser$Plain$Params {
}

export function getLearningsOfUser$Plain(http: HttpClient, rootUrl: string, params?: GetLearningsOfUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LearningViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getLearningsOfUser$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<LearningViewModel>>;
    })
  );
}

getLearningsOfUser$Plain.PATH = '/Learning/GetLearningsOfUser';
