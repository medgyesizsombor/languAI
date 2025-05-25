/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseViewModel } from '../../models/exercise-view-model';

export interface ReceiveExercisesFromChatGpt$Plain$Params {
  topicId?: number;
}

export function receiveExercisesFromChatGpt$Plain(http: HttpClient, rootUrl: string, params?: ReceiveExercisesFromChatGpt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseViewModel>>> {
  const rb = new RequestBuilder(rootUrl, receiveExercisesFromChatGpt$Plain.PATH, 'get');
  if (params) {
    rb.query('topicId', params.topicId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ExerciseViewModel>>;
    })
  );
}

receiveExercisesFromChatGpt$Plain.PATH = '/ChatGPT/ReceiveExercisesFromChatGPT';
