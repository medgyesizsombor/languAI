/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ChangeAccessOfCardListViewModel } from '../../models/change-access-of-card-list-view-model';

export interface ChangeAccessOfCardList$Json$Params {
      body?: ChangeAccessOfCardListViewModel
}

export function changeAccessOfCardList$Json(http: HttpClient, rootUrl: string, params?: ChangeAccessOfCardList$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, changeAccessOfCardList$Json.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
    })
  );
}

changeAccessOfCardList$Json.PATH = '/Card/ChangeAccessOfCardList';
