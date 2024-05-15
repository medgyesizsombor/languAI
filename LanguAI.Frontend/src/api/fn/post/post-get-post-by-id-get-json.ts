/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostViewModel } from '../../models/post-view-model';

export interface PostGetPostByIdGet$Json$Params {
  id?: number;
}

export function postGetPostByIdGet$Json(http: HttpClient, rootUrl: string, params?: PostGetPostByIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<PostViewModel>> {
  const rb = new RequestBuilder(rootUrl, postGetPostByIdGet$Json.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
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

postGetPostByIdGet$Json.PATH = '/Post/GetPostById';
