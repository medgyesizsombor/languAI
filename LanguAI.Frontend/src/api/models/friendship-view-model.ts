/* tslint:disable */
/* eslint-disable */
import { FriendshipStatusEnum } from '../models/friendship-status-enum';
export interface FriendshipViewModel {
  created?: string;
  id?: number;
  isCloseFriendship?: boolean;
  recipientId?: number;
  requesterId?: number;
  status?: FriendshipStatusEnum;
}
