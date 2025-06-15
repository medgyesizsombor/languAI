/* tslint:disable */
/* eslint-disable */
import { FriendshipStatusEnum } from '../models/friendship-status-enum';
import { ImageViewModel } from '../models/image-view-model';
export interface UserDiscoveryViewModel {
  friendshipStatusEnum?: FriendshipStatusEnum;
  profilePicture?: ImageViewModel;
  userId?: number;
  username?: string | null;
}
