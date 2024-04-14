/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthenticateRequestViewModel } from '../../models/authenticate-request-view-model';

export interface AuthenticationAuthenticatePost$Json$Params {
      body?: AuthenticateRequestViewModel
}

export function authenticationAuthenticatePost$Json(http: HttpClient, rootUrl: string, params?: AuthenticationAuthenticatePost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
  const rb = new RequestBuilder(rootUrl, authenticationAuthenticatePost$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
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

authenticationAuthenticatePost$Json.PATH = '/Authentication/Authenticate';
