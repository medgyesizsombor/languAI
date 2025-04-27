/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetPostCorrectionFromChatGpt$Json$Params {
  text?: string;
}

export function getPostCorrectionFromChatGpt$Json(http: HttpClient, rootUrl: string, params?: GetPostCorrectionFromChatGpt$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, getPostCorrectionFromChatGpt$Json.PATH, 'get');
  if (params) {
    rb.query('text', params.text, {});
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

getPostCorrectionFromChatGpt$Json.PATH = '/ChatGPT/GetPostCorrectionFromChatGPT';
