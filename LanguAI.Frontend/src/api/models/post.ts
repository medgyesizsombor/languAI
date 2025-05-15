/* tslint:disable */
/* eslint-disable */
import { AccessEnum } from '../models/access-enum';
import { Image } from '../models/image';
import { Interaction } from '../models/interaction';
import { User } from '../models/user';
export interface Post {
  access: AccessEnum;
  content: string;
  created: string;
  id: number;
  image?: Image;
  imageId?: number | null;
  interactions?: Array<Interaction> | null;
  isDeleted?: boolean;
  user?: User;
  userId: number;
}
