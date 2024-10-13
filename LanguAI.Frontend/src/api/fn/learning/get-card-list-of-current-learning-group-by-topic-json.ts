/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TopicOfCurrentLearningViewModel } from '../../models/topic-of-current-learning-view-model';

export interface GetCardListOfCurrentLearningGroupByTopic$Json$Params {
  userId?: number;
}

export function getCardListOfCurrentLearningGroupByTopic$Json(http: HttpClient, rootUrl: string, params?: GetCardListOfCurrentLearningGroupByTopic$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TopicOfCurrentLearningViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getCardListOfCurrentLearningGroupByTopic$Json.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TopicOfCurrentLearningViewModel>>;
    })
  );
}

getCardListOfCurrentLearningGroupByTopic$Json.PATH = '/Learning/GetCardListOfCurrentLearningGroupByTopic';
