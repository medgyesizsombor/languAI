/* tslint:disable */
/* eslint-disable */
import { AccessEnum } from '../models/access-enum';
export interface SavePostRequest {
  access?: AccessEnum;
  content?: string | null;
  created?: string;
  id?: number | null;
  userId?: number;
}
