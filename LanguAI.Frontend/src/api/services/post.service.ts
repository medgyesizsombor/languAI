/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { postGetAllPostsGet$Json } from '../fn/post/post-get-all-posts-get-json';
import { PostGetAllPostsGet$Json$Params } from '../fn/post/post-get-all-posts-get-json';
import { postGetAllPostsGet$Plain } from '../fn/post/post-get-all-posts-get-plain';
import { PostGetAllPostsGet$Plain$Params } from '../fn/post/post-get-all-posts-get-plain';
import { postGetPostByIdGet$Json } from '../fn/post/post-get-post-by-id-get-json';
import { PostGetPostByIdGet$Json$Params } from '../fn/post/post-get-post-by-id-get-json';
import { postGetPostByIdGet$Plain } from '../fn/post/post-get-post-by-id-get-plain';
import { PostGetPostByIdGet$Plain$Params } from '../fn/post/post-get-post-by-id-get-plain';
import { PostViewModel } from '../models/post-view-model';

@Injectable({ providedIn: 'root' })
export class PostService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `postGetAllPostsGet()` */
  static readonly PostGetAllPostsGetPath = '/Post/GetAllPosts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postGetAllPostsGet$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  postGetAllPostsGet$Plain$Response(params?: PostGetAllPostsGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
    return postGetAllPostsGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postGetAllPostsGet$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  postGetAllPostsGet$Plain(params?: PostGetAllPostsGet$Plain$Params, context?: HttpContext): Observable<Array<PostViewModel>> {
    return this.postGetAllPostsGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PostViewModel>>): Array<PostViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postGetAllPostsGet$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  postGetAllPostsGet$Json$Response(params?: PostGetAllPostsGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
    return postGetAllPostsGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postGetAllPostsGet$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  postGetAllPostsGet$Json(params?: PostGetAllPostsGet$Json$Params, context?: HttpContext): Observable<Array<PostViewModel>> {
    return this.postGetAllPostsGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PostViewModel>>): Array<PostViewModel> => r.body)
    );
  }

  /** Path part for operation `postGetPostByIdGet()` */
  static readonly PostGetPostByIdGetPath = '/Post/GetPostById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postGetPostByIdGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  postGetPostByIdGet$Plain$Response(params?: PostGetPostByIdGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<PostViewModel>> {
    return postGetPostByIdGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postGetPostByIdGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postGetPostByIdGet$Plain(params?: PostGetPostByIdGet$Plain$Params, context?: HttpContext): Observable<PostViewModel> {
    return this.postGetPostByIdGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<PostViewModel>): PostViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postGetPostByIdGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  postGetPostByIdGet$Json$Response(params?: PostGetPostByIdGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<PostViewModel>> {
    return postGetPostByIdGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `postGetPostByIdGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postGetPostByIdGet$Json(params?: PostGetPostByIdGet$Json$Params, context?: HttpContext): Observable<PostViewModel> {
    return this.postGetPostByIdGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<PostViewModel>): PostViewModel => r.body)
    );
  }

}
