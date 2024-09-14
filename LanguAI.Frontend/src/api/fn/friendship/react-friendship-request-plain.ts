/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FriendshipStatusEnum } from '../../models/friendship-status-enum';

export interface ReactFriendshipRequest$Plain$Params {
  recipientId?: number;
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

export function reactFriendshipRequest$Plain(http: HttpClient, rootUrl: string, params?: ReactFriendshipRequest$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<FriendshipStatusEnum>> {
  const rb = new RequestBuilder(rootUrl, reactFriendshipRequest$Plain.PATH, 'post');
  if (params) {
    rb.query('recipientId', params.recipientId, {});
    rb.query('requesterId', params.requesterId, {});
    rb.query('friendshipStatus', params.friendshipStatus, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FriendshipStatusEnum>;
    })
  );
}

reactFriendshipRequest$Plain.PATH = '/Friendship/ReactFriendshipRequest';
