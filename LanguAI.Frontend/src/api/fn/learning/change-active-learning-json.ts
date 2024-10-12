/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ChangeActiveLearning$Json$Params {
  userId?: number;
  learningId?: number;
}

export function changeActiveLearning$Json(http: HttpClient, rootUrl: string, params?: ChangeActiveLearning$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, changeActiveLearning$Json.PATH, 'post');
  if (params) {
    rb.query('userId', params.userId, {});
    rb.query('learningId', params.learningId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

changeActiveLearning$Json.PATH = '/Learning/ChangeActiveLearning';
