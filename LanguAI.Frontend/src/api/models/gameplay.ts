/* tslint:disable */
/* eslint-disable */
import { User } from '../models/user';
export interface Gameplay {
  date: string;
  id: number;
  point: number;
  user?: User;
  userId: number;
}
