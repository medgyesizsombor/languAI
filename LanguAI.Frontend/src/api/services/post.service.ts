/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllPost$Json } from '../fn/post/get-all-post-json';
import { GetAllPost$Json$Params } from '../fn/post/get-all-post-json';
import { getAllPost$Plain } from '../fn/post/get-all-post-plain';
import { GetAllPost$Plain$Params } from '../fn/post/get-all-post-plain';
import { getPostById$Json } from '../fn/post/get-post-by-id-json';
import { GetPostById$Json$Params } from '../fn/post/get-post-by-id-json';
import { getPostById$Plain } from '../fn/post/get-post-by-id-plain';
import { GetPostById$Plain$Params } from '../fn/post/get-post-by-id-plain';
import { getPosts$Json } from '../fn/post/get-posts-json';
import { GetPosts$Json$Params } from '../fn/post/get-posts-json';
import { getPosts$Plain } from '../fn/post/get-posts-plain';
import { GetPosts$Plain$Params } from '../fn/post/get-posts-plain';
import { getPostsFromForum$Json } from '../fn/post/get-posts-from-forum-json';
import { GetPostsFromForum$Json$Params } from '../fn/post/get-posts-from-forum-json';
import { getPostsFromForum$Plain } from '../fn/post/get-posts-from-forum-plain';
import { GetPostsFromForum$Plain$Params } from '../fn/post/get-posts-from-forum-plain';
import { PostViewModel } from '../models/post-view-model';
import { savePost$Json } from '../fn/post/save-post-json';
import { SavePost$Json$Params } from '../fn/post/save-post-json';
import { savePost$Plain } from '../fn/post/save-post-plain';
import { SavePost$Plain$Params } from '../fn/post/save-post-plain';

@Injectable({ providedIn: 'root' })
export class PostService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllPost()` */
  static readonly GetAllPostPath = '/Post/GetAllPost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPost$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPost$Plain$Response(params?: GetAllPost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
    return getAllPost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPost$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPost$Plain(params?: GetAllPost$Plain$Params, context?: HttpContext): Observable<Array<PostViewModel>> {
    return this.getAllPost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PostViewModel>>): Array<PostViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPost$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPost$Json$Response(params?: GetAllPost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
    return getAllPost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPost$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPost$Json(params?: GetAllPost$Json$Params, context?: HttpContext): Observable<Array<PostViewModel>> {
    return this.getAllPost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PostViewModel>>): Array<PostViewModel> => r.body)
    );
  }

  /** Path part for operation `getPosts()` */
  static readonly GetPostsPath = '/Post/GetPosts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPosts$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosts$Plain$Response(params?: GetPosts$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
    return getPosts$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPosts$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosts$Plain(params?: GetPosts$Plain$Params, context?: HttpContext): Observable<Array<PostViewModel>> {
    return this.getPosts$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PostViewModel>>): Array<PostViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPosts$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosts$Json$Response(params?: GetPosts$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
    return getPosts$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPosts$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPosts$Json(params?: GetPosts$Json$Params, context?: HttpContext): Observable<Array<PostViewModel>> {
    return this.getPosts$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PostViewModel>>): Array<PostViewModel> => r.body)
    );
  }

  /** Path part for operation `getPostById()` */
  static readonly GetPostByIdPath = '/Post/GetPostById';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostById$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostById$Plain$Response(params?: GetPostById$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<PostViewModel>> {
    return getPostById$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostById$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostById$Plain(params?: GetPostById$Plain$Params, context?: HttpContext): Observable<PostViewModel> {
    return this.getPostById$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<PostViewModel>): PostViewModel => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostById$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostById$Json$Response(params?: GetPostById$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<PostViewModel>> {
    return getPostById$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostById$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostById$Json(params?: GetPostById$Json$Params, context?: HttpContext): Observable<PostViewModel> {
    return this.getPostById$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<PostViewModel>): PostViewModel => r.body)
    );
  }

  /** Path part for operation `savePost()` */
  static readonly SavePostPath = '/Post/SavePost';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePost$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  savePost$Plain$Response(params?: SavePost$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return savePost$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePost$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  savePost$Plain(params?: SavePost$Plain$Params, context?: HttpContext): Observable<boolean> {
    return this.savePost$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `savePost$Json()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  savePost$Json$Response(params?: SavePost$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return savePost$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `savePost$Json$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  savePost$Json(params?: SavePost$Json$Params, context?: HttpContext): Observable<boolean> {
    return this.savePost$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getPostsFromForum()` */
  static readonly GetPostsFromForumPath = '/Post/GetPostsFromForum';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostsFromForum$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostsFromForum$Plain$Response(params?: GetPostsFromForum$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
    return getPostsFromForum$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostsFromForum$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostsFromForum$Plain(params?: GetPostsFromForum$Plain$Params, context?: HttpContext): Observable<Array<PostViewModel>> {
    return this.getPostsFromForum$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PostViewModel>>): Array<PostViewModel> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostsFromForum$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostsFromForum$Json$Response(params?: GetPostsFromForum$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PostViewModel>>> {
    return getPostsFromForum$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPostsFromForum$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostsFromForum$Json(params?: GetPostsFromForum$Json$Params, context?: HttpContext): Observable<Array<PostViewModel>> {
    return this.getPostsFromForum$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PostViewModel>>): Array<PostViewModel> => r.body)
    );
  }

}
