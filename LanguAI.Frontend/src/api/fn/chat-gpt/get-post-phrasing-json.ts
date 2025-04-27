/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetPostPhrasing$Json$Params {
  about?: string;
}

export function getPostPhrasing$Json(http: HttpClient, rootUrl: string, params?: GetPostPhrasing$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, getPostPhrasing$Json.PATH, 'get');
  if (params) {
    rb.query('about', params.about, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

getPostPhrasing$Json.PATH = '/ChatGPT/GetPostPhrasing';
