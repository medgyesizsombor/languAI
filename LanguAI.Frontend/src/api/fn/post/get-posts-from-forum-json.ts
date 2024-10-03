/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostViewModel } from '../../models/post-view-model';

export interface GetPostsFromForum$Json$Params {
  userId?: number;
}

export function getPostsFromForum$Json(http: HttpClient, rootUrl: string, params?: GetPostsFromForum$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getPostsFromForum$Json.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
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

getPostsFromForum$Json.PATH = '/Post/GetPostsFromForum';
