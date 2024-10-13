/* tslint:disable */
/* eslint-disable */
import { MessageStatusEnum } from '../models/message-status-enum';
import { User } from '../models/user';
export interface Message {
  id: number;
  recipient?: User;
  recipientId: number;
  sender?: User;
  senderId: number;
  sentAt: string;
  status: MessageStatusEnum;
  text: string;
}
