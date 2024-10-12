/* tslint:disable */
/* eslint-disable */
import { LanguageLevelEnum } from '../models/language-level-enum';
export interface SaveLearningRequestViewModel {
  id?: number | null;
  isActive?: boolean;
  languageId?: number;
  languageLevel?: LanguageLevelEnum;
  userId?: number;
}
