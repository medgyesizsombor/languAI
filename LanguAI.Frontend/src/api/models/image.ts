/* tslint:disable */
/* eslint-disable */
import { Post } from '../models/post';
import { User } from '../models/user';
export interface Image {
  id: number;
  isDeleted?: boolean;
  name: string;
  post?: Post;
  type: string;
  uploaded?: string | null;
  user?: User;
}
