/* tslint:disable */
/* eslint-disable */
import { ImageViewModel } from '../models/image-view-model';
export interface LeaderboardUserViewModel {
  image?: ImageViewModel;
  imageId?: number | null;
  points?: number;
  userId?: number;
  username?: string | null;
}
