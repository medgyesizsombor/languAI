/* tslint:disable */
/* eslint-disable */
import { CardListAccessEnum } from '../models/card-list-access-enum';
import { CardViewModel } from '../models/card-view-model';
export interface CardListViewModel {
  access?: CardListAccessEnum;
  cardViewModelList?: Array<CardViewModel> | null;
  created?: string;
  id?: number;
  learningLanguage?: string | null;
  modified?: string;
  name?: string | null;
  nativeLanguage?: string | null;
  userId?: number;
}
