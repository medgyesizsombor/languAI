/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetStreakOfCurrentUser$Plain$Params {
}

export function getStreakOfCurrentUser$Plain(http: HttpClient, rootUrl: string, params?: GetStreakOfCurrentUser$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
  const rb = new RequestBuilder(rootUrl, getStreakOfCurrentUser$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
    })
  );
}

getStreakOfCurrentUser$Plain.PATH = '/User/GetStreakOfCurrentUser';
