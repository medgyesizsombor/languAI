/* tslint:disable */
/* eslint-disable */
import { Language } from '../models/language';
import { LanguageLevelEnum } from '../models/language-level-enum';
import { User } from '../models/user';
export interface Learning {
  id: number;
  isActive: boolean;
  languageLevel: LanguageLevelEnum;
  learningLanguage?: Language;
  learningLanguageId: number;
  nativeLanguage?: Language;
  nativeLanguageId: number;
  user?: User;
  userId: number;
}
