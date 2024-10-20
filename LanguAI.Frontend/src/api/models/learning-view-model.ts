/* tslint:disable */
/* eslint-disable */
import { LanguageLevelEnum } from '../models/language-level-enum';
export interface LearningViewModel {
  id?: number;
  isActive?: boolean;
  languageLevel?: LanguageLevelEnum;
  learningLanguageCode?: string | null;
  learningLanguageId?: number;
  learningLanguageName?: string | null;
  learningLanguageNameInHun?: string | null;
  nativeLanguageCode?: string | null;
  nativeLanguageId?: number;
  nativeLanguageName?: string | null;
  nativeLanguageNameInHun?: string | null;
  userId?: number;
}
