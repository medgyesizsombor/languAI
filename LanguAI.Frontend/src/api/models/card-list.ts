/* tslint:disable */
/* eslint-disable */
import { AccessEnum } from '../models/access-enum';
import { Card } from '../models/card';
import { Language } from '../models/language';
import { Topic } from '../models/topic';
import { User } from '../models/user';
export interface CardList {
  access: AccessEnum;
  cards?: Array<Card> | null;
  created: string;
  id: number;
  isDeleted: boolean;
  learningLanguage?: Language;
  learningLanguageId: number;
  modified: string;
  name: string;
  nativeLanguage?: Language;
  nativeLanguageId: number;
  topic?: Topic;
  topicId: number;
  user?: User;
  userId: number;
}
