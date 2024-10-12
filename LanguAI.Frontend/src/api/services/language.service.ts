/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllLanguage$Json } from '../fn/language/get-all-language-json';
import { GetAllLanguage$Json$Params } from '../fn/language/get-all-language-json';
import { getAllLanguage$Plain } from '../fn/language/get-all-language-plain';
import { GetAllLanguage$Plain$Params } from '../fn/language/get-all-language-plain';
import { IntSelectorModel } from '../models/int-selector-model';

@Injectable({ providedIn: 'root' })
export class LanguageService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllLanguage()` */
  static readonly GetAllLanguagePath = '/Language/GetAllLanguage';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllLanguage$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguage$Plain$Response(params?: GetAllLanguage$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
    return getAllLanguage$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllLanguage$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguage$Plain(params?: GetAllLanguage$Plain$Params, context?: HttpContext): Observable<Array<IntSelectorModel>> {
    return this.getAllLanguage$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<IntSelectorModel>>): Array<IntSelectorModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllLanguage$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguage$Json$Response(params?: GetAllLanguage$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<IntSelectorModel>>> {
    return getAllLanguage$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllLanguage$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllLanguage$Json(params?: GetAllLanguage$Json$Params, context?: HttpContext): Observable<Array<IntSelectorModel>> {
    return this.getAllLanguage$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<IntSelectorModel>>): Array<IntSelectorModel> => r.body)
    );
  }

}
