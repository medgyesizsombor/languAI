/* tslint:disable */
/* eslint-disable */
import { AccessEnum } from '../models/access-enum';
export interface PostViewModel {
  access?: AccessEnum;
  content?: string | null;
  created?: string;
  id?: number | null;
  username?: string | null;
}
