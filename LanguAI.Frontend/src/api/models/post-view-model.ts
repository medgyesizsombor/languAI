/* tslint:disable */
/* eslint-disable */
import { AccessEnum } from '../models/access-enum';
import { CommentViewModel } from '../models/comment-view-model';
import { ImageViewModel } from '../models/image-view-model';
export interface PostViewModel {
  access?: AccessEnum;
  comments?: Array<CommentViewModel> | null;
  content?: string | null;
  created?: string;
  id?: number | null;
  image?: ImageViewModel;
  liked?: boolean;
  numberOfComments?: number;
  numberOfLikes?: number;
  username?: string | null;
}
