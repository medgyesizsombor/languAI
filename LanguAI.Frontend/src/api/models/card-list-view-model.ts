/* tslint:disable */
/* eslint-disable */
import { AccessEnum } from '../models/access-enum';
import { CardViewModel } from '../models/card-view-model';
import { Language } from '../models/language';
export interface CardListViewModel {
  access?: AccessEnum;
  cardViewModelList?: Array<CardViewModel> | null;
  created?: string;
  id?: number;
  learningLanguage?: Language;
  modified?: string;
  name?: string | null;
  nativeLanguage?: Language;
  userId?: number;
}
