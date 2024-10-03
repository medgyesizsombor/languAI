/* tslint:disable */
/* eslint-disable */
import { AccessEnum } from '../models/access-enum';
import { CommentViewModel } from '../models/comment-view-model';
export interface PostViewModel {
  access?: AccessEnum;
  comments?: Array<CommentViewModel> | null;
  content?: string | null;
  created?: string;
  id?: number | null;
  liked?: boolean;
  numberOfComments?: number;
  numberOfLikes?: number;
  username?: string | null;
}
