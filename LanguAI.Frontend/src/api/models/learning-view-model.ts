/* tslint:disable */
/* eslint-disable */
import { LanguageLevelEnum } from '../models/language-level-enum';
export interface LearningViewModel {
  id?: number;
  isActive?: boolean;
  languageCode?: string | null;
  languageId?: number;
  languageLevel?: LanguageLevelEnum;
  languageName?: string | null;
  languageNameInHun?: string | null;
  userId?: number;
}
