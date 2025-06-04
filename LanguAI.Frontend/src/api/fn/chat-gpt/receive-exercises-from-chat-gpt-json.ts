/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseViewModel } from '../../models/exercise-view-model';

export interface ReceiveExercisesFromChatGpt$Json$Params {
  topicId?: number;
}

export function receiveExercisesFromChatGpt$Json(http: HttpClient, rootUrl: string, params?: ReceiveExercisesFromChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseViewModel>>> {
  const rb = new RequestBuilder(rootUrl, receiveExercisesFromChatGpt$Json.PATH, 'get');
  if (params) {
    rb.query('topicId', params.topicId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ExerciseViewModel>>;
    })
  );
}

receiveExercisesFromChatGpt$Json.PATH = '/ChatGPT/ReceiveExercisesFromChatGPT';
