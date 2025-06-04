/* tslint:disable */
/* eslint-disable */
import { ImageViewModel } from '../models/image-view-model';
import { LastMessageViewModel } from '../models/last-message-view-model';
export interface OtherUserViewModel {
  lastMessage?: LastMessageViewModel;
  profilePicture?: ImageViewModel;
  userId?: number;
  username?: string | null;
}
