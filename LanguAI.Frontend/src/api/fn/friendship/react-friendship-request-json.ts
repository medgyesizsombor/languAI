/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FriendshipStatusEnum } from '../../models/friendship-status-enum';

export interface ReactFriendshipRequest$Json$Params {
  requesterId?: number;

/**
 * 1 = Requested
 *
 * 2 = Accepted
 *
 * 3 = Deleted
 */
  friendshipStatus?: FriendshipStatusEnum;
}

export function reactFriendshipRequest$Json(http: HttpClient, rootUrl: string, params?: ReactFriendshipRequest$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<FriendshipStatusEnum>> {
  const rb = new RequestBuilder(rootUrl, reactFriendshipRequest$Json.PATH, 'post');
  if (params) {
    rb.query('requesterId', params.requesterId, {});
    rb.query('friendshipStatus', params.friendshipStatus, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FriendshipStatusEnum>;
    })
  );
}

reactFriendshipRequest$Json.PATH = '/Friendship/ReactFriendshipRequest';
