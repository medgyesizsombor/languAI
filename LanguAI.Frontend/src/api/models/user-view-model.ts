/* tslint:disable */
/* eslint-disable */
import { ImageViewModel } from '../models/image-view-model';
export interface UserViewModel {
  dateOfBirth?: string;
  email?: string | null;
  id?: number;
  isActive?: boolean;
  profilePicture?: ImageViewModel;
  streak?: number;
  username?: string | null;
}
