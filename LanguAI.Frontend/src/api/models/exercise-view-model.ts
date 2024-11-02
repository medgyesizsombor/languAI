/* tslint:disable */
/* eslint-disable */
import { ExerciseTypeEnum } from '../models/exercise-type-enum';
import { IsCorrectAndTextSentenceViewModel } from '../models/is-correct-and-text-sentence-view-model';
import { SentenceAssemblyExerciseWord } from '../models/sentence-assembly-exercise-word';
export interface ExerciseViewModel {
  correctWord?: string | null;
  exerciseId?: number;
  exerciseType?: ExerciseTypeEnum;
  firstPartOfTheSentence?: string | null;
  isActive?: boolean;
  isCorrectAndTextSentences?: Array<IsCorrectAndTextSentenceViewModel> | null;
  lastPartOfTheSentence?: string | null;
  mainSentence?: string | null;
  sentenceAssemblyExerciseSentence?: Array<SentenceAssemblyExerciseWord> | null;
  words?: Array<string> | null;
}
