/* tslint:disable */
/* eslint-disable */
import { Language } from '../models/language';
import { LanguageLevelEnum } from '../models/language-level-enum';
import { User } from '../models/user';
export interface Learning {
  id: number;
  isActive: boolean;
  language?: Language;
  languageId: number;
  languageLevel: LanguageLevelEnum;
  user?: User;
  userId: number;
}
