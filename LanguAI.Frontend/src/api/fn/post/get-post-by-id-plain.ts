/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostViewModel } from '../../models/post-view-model';

export interface GetPostById$Plain$Params {
  id?: number;
}

export function getPostById$Plain(http: HttpClient, rootUrl: string, params?: GetPostById$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<PostViewModel>> {
  const rb = new RequestBuilder(rootUrl, getPostById$Plain.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PostViewModel>;
    })
  );
}

getPostById$Plain.PATH = '/Post/GetPostById';
