/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteBlob$Json } from '../fn/storage/delete-blob-json';
import { DeleteBlob$Json$Params } from '../fn/storage/delete-blob-json';
import { deleteBlob$Plain } from '../fn/storage/delete-blob-plain';
import { DeleteBlob$Plain$Params } from '../fn/storage/delete-blob-plain';
import { downloadBlob$Json } from '../fn/storage/download-blob-json';
import { DownloadBlob$Json$Params } from '../fn/storage/download-blob-json';
import { downloadBlob$Plain } from '../fn/storage/download-blob-plain';
import { DownloadBlob$Plain$Params } from '../fn/storage/download-blob-plain';
import { uploadBlob$Json } from '../fn/storage/upload-blob-json';
import { UploadBlob$Json$Params } from '../fn/storage/upload-blob-json';
import { uploadBlob$Plain } from '../fn/storage/upload-blob-plain';
import { UploadBlob$Plain$Params } from '../fn/storage/upload-blob-plain';

@Injectable({ providedIn: 'root' })
export class StorageService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `uploadBlob()` */
  static readonly UploadBlobPath = '/Storage/UploadBlob';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBlob$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  uploadBlob$Plain$Response(params?: UploadBlob$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return uploadBlob$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBlob$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  uploadBlob$Plain(params?: UploadBlob$Plain$Params, context?: HttpContext): Observable<number> {
    return this.uploadBlob$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadBlob$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  uploadBlob$Json$Response(params?: UploadBlob$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return uploadBlob$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `uploadBlob$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  uploadBlob$Json(params?: UploadBlob$Json$Params, context?: HttpContext): Observable<number> {
    return this.uploadBlob$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `downloadBlob()` */
  static readonly DownloadBlobPath = '/Storage/DownloadBlob';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadBlob$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadBlob$Plain$Response(params?: DownloadBlob$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return downloadBlob$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `downloadBlob$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadBlob$Plain(params?: DownloadBlob$Plain$Params, context?: HttpContext): Observable<string> {
    return this.downloadBlob$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadBlob$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadBlob$Json$Response(params?: DownloadBlob$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return downloadBlob$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `downloadBlob$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadBlob$Json(params?: DownloadBlob$Json$Params, context?: HttpContext): Observable<string> {
    return this.downloadBlob$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `deleteBlob()` */
  static readonly DeleteBlobPath = '/Storage/DeleteBlob';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBlob$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBlob$Plain$Response(params?: DeleteBlob$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteBlob$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBlob$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBlob$Plain(params?: DeleteBlob$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteBlob$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBlob$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBlob$Json$Response(params?: DeleteBlob$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteBlob$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBlob$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBlob$Json(params?: DeleteBlob$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteBlob$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

}
