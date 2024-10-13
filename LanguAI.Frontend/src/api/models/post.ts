/* tslint:disable */
/* eslint-disable */
import { AccessEnum } from '../models/access-enum';
import { Interaction } from '../models/interaction';
import { User } from '../models/user';
export interface Post {
  access: AccessEnum;
  content: string;
  created: string;
  id: number;
  interactions?: Array<Interaction> | null;
  user?: User;
  userId: number;
}
