/* tslint:disable */
/* eslint-disable */
import { CardViewModel } from '../models/card-view-model';
export interface CardListViewModel {
  cardViewModelList?: Array<CardViewModel> | null;
  id?: number;
  learningLanguage?: string | null;
  name?: string | null;
  nativeLanguage?: string | null;
  userId?: number;
}
