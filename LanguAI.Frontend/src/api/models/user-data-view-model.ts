/* tslint:disable */
/* eslint-disable */
import { LearningViewModel } from '../models/learning-view-model';
export interface UserDataViewModel {
  currentLearning?: LearningViewModel;
  dateOfBirth?: string;
  id?: number;
  languageId?: number;
  streak?: number;
  username?: string | null;
}
