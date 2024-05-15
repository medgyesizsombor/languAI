/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { GetPostRequest } from '../../models/get-post-request';
import { PostViewModel } from '../../models/post-view-model';

export interface PostGetAllPostsGet$Json$Params {
      body?: GetPostRequest
}

export function postGetAllPostsGet$Json(http: HttpClient, rootUrl: string, params?: PostGetAllPostsGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
  const rb = new RequestBuilder(rootUrl, postGetAllPostsGet$Json.PATH, 'get');
  if (params) {
    rb.body(params.body, 'application/*+json');
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

postGetAllPostsGet$Json.PATH = '/Post/GetAllPosts';
