/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface DeleteUser$Json$Params {
  userId?: number;
}

export function deleteUser$Json(http: HttpClient, rootUrl: string, params?: DeleteUser$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
  const rb = new RequestBuilder(rootUrl, deleteUser$Json.PATH, 'post');
  if (params) {
    rb.query('userId', params.userId, {});
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

deleteUser$Json.PATH = '/User/DeleteUser';
