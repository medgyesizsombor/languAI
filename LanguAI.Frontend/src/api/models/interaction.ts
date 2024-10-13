/* tslint:disable */
/* eslint-disable */
import { InteractionEnum } from '../models/interaction-enum';
import { Post } from '../models/post';
import { User } from '../models/user';
export interface Interaction {
  childInteractions?: Array<Interaction> | null;
  content?: string | null;
  created: string;
  id: number;
  interactionType: InteractionEnum;
  isDeleted: boolean;
  parentInteraction?: Interaction;
  parentInteractionId?: number | null;
  post?: Post;
  postId?: number | null;
  user?: User;
  userId: number;
}
