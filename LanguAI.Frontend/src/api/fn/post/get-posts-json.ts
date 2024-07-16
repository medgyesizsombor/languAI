/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostViewModel } from '../../models/post-view-model';

export interface GetPosts$Json$Params {
  Username?: string;
  Created?: string;
  Language?: string;
}

export function getPosts$Json(http: HttpClient, rootUrl: string, params?: GetPosts$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getPosts$Json.PATH, 'get');
  if (params) {
    rb.query('Username', params.Username, {});
    rb.query('Created', params.Created, {});
    rb.query('Language', params.Language, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PostViewModel>>;
    })
  );
}

getPosts$Json.PATH = '/Post/GetPosts';
