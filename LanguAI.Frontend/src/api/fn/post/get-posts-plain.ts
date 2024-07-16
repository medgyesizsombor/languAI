/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostViewModel } from '../../models/post-view-model';

export interface GetPosts$Plain$Params {
  Username?: string;
  Created?: string;
  Language?: string;
}

export function getPosts$Plain(http: HttpClient, rootUrl: string, params?: GetPosts$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getPosts$Plain.PATH, 'get');
  if (params) {
    rb.query('Username', params.Username, {});
    rb.query('Created', params.Created, {});
    rb.query('Language', params.Language, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PostViewModel>>;
    })
  );
}

getPosts$Plain.PATH = '/Post/GetPosts';
