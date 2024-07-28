/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface RequestFriendship$Plain$Params {
  requesterId?: number;
  receiverId?: number;
}

export function requestFriendship$Plain(http: HttpClient, rootUrl: string, params?: RequestFriendship$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, requestFriendship$Plain.PATH, 'post');
  if (params) {
    rb.query('requesterId', params.requesterId, {});
    rb.query('receiverId', params.receiverId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

requestFriendship$Plain.PATH = '/Friendship/RequestFriendship';
