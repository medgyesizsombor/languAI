/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ExerciseTypeEnum } from '../../models/exercise-type-enum';
import { ExerciseViewModel } from '../../models/exercise-view-model';

export interface ReceiveExercisesFromChatGpt$Json$Params {
  UserId?: number;
  LanguageLevel?: string;
  TopicDescription?: string;

/**
 * 1 = MissingWordExercise
 *
 * 2 = MistakeCorrectingExercise
 *
 * 3 = QuestionAnsweringExercise
 *
 * 4 = SentenceAssemblyExercise
 *
 * 5 = WordPairingExercise
 */
  ExerciseType?: ExerciseTypeEnum;
  CardListId?: number;
}

export function receiveExercisesFromChatGpt$Json(http: HttpClient, rootUrl: string, params?: ReceiveExercisesFromChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExerciseViewModel>>> {
  const rb = new RequestBuilder(rootUrl, receiveExercisesFromChatGpt$Json.PATH, 'get');
  if (params) {
    rb.query('UserId', params.UserId, {});
    rb.query('LanguageLevel', params.LanguageLevel, {});
    rb.query('TopicDescription', params.TopicDescription, {});
    rb.query('ExerciseType', params.ExerciseType, {});
    rb.query('CardListId', params.CardListId, {});
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
