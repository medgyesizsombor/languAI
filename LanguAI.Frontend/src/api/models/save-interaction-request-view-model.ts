/* tslint:disable */
/* eslint-disable */
import { InteractionEnum } from '../models/interaction-enum';
export interface SaveInteractionRequestViewModel {
  content?: string | null;
  id?: number | null;
  interactionType?: InteractionEnum;
  isDeleted?: boolean;
  parentInteractionId?: number | null;
  postId?: number | null;
  userId?: number;
}
