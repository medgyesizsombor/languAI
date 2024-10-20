/* tslint:disable */
/* eslint-disable */
import { ExerciseTypeEnum } from '../models/exercise-type-enum';
import { IsCorrectAndTextSentenceViewModel } from '../models/is-correct-and-text-sentence-view-model';
export interface ExerciseViewModel {
  exerciseId?: number;
  exerciseType?: ExerciseTypeEnum;
  isActive?: boolean;
  isCorrectAndTextSentences?: Array<IsCorrectAndTextSentenceViewModel> | null;
  mainSentence?: string | null;
}
