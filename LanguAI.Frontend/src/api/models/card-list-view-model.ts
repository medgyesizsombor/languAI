/* tslint:disable */
/* eslint-disable */
import { CardViewModel } from '../models/card-view-model';
export interface CardListViewModel {
  cardViewModelList?: Array<CardViewModel> | null;
  created?: string;
  id?: number;
  learningLanguage?: string | null;
  modified?: string;
  name?: string | null;
  nativeLanguage?: string | null;
  userId?: number;
}
