/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Friendship {
  created: string;
  id: number;
  isCloseFriendship: boolean;
  recipient?: User;
  recipientId: number;
  requester?: User;
  requesterId: number;
  status: number;
}
