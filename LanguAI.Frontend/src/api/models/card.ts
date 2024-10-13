/* tslint:disable */
/* eslint-disable */
import { CardList } from '../models/card-list';
export interface Card {
  cardList?: CardList;
  cardListId: number;
  id: number;
  wordInLearningLanguage: string;
  wordInNativeLanguage: string;
}
