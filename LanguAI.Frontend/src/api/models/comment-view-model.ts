/* tslint:disable */
/* eslint-disable */
import { UserViewModel } from '../models/user-view-model';
export interface CommentViewModel {
  created?: string;
  id?: number;
  liked?: boolean;
  numberOfLikes?: number;
  text?: string | null;
  user?: UserViewModel;
  userId?: number;
}
