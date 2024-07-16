/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PostViewModel } from '../../models/post-view-model';

export interface GetAllPost$Plain$Params {
}

export function getAllPost$Plain(http: HttpClient, rootUrl: string, params?: GetAllPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
  const rb = new RequestBuilder(rootUrl, getAllPost$Plain.PATH, 'get');
  if (params) {
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

getAllPost$Plain.PATH = '/Post/GetAllPost';
