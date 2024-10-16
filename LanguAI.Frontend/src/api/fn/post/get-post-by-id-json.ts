/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostViewModel } from '../../models/post-view-model';

export interface GetPostById$Json$Params {
  postId?: number;
}

export function getPostById$Json(http: HttpClient, rootUrl: string, params?: GetPostById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<PostViewModel>> {
  const rb = new RequestBuilder(rootUrl, getPostById$Json.PATH, 'get');
  if (params) {
    rb.query('postId', params.postId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PostViewModel>;
    })
  );
}

getPostById$Json.PATH = '/Post/GetPostById';
