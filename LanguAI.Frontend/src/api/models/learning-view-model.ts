/* tslint:disable */
/* eslint-disable */
import { LanguageLevelEnum } from '../models/language-level-enum';
export interface LearningViewModel {
  id?: number;
  isActive?: boolean;
  languageCode?: string | null;
  languageId?: number;
  languageInHun?: string | null;
  languageLevel?: LanguageLevelEnum;
  languageName?: string | null;
  userId?: number;
}
