/* tslint:disable */
/* eslint-disable */
import { MessageStatusEnum } from '../models/message-status-enum';
export interface MessageViewModel {
  id?: number | null;
  recipientId?: number;
  senderId?: number;
  sentAt?: string;
  status?: MessageStatusEnum;
  text?: string | null;
}
