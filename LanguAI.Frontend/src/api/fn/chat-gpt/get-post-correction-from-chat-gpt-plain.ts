/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetPostCorrectionFromChatGpt$Plain$Params {
  text?: string;
}

export function getPostCorrectionFromChatGpt$Plain(http: HttpClient, rootUrl: string, params?: GetPostCorrectionFromChatGpt$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, getPostCorrectionFromChatGpt$Plain.PATH, 'get');
  if (params) {
    rb.query('text', params.text, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<string>;
    })
  );
}

getPostCorrectionFromChatGpt$Plain.PATH = '/ChatGPT/GetPostCorrectionFromChatGPT';
