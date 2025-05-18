/* tslint:disable */
/* eslint-disable */
import { CardListViewModel } from '../models/card-list-view-model';
import { IntSelectorModel } from '../models/int-selector-model';
import { UserViewModel } from '../models/user-view-model';
export interface ProfilePageDataViewModel {
  cardList?: Array<CardListViewModel> | null;
  friendList?: Array<IntSelectorModel> | null;
  user?: UserViewModel;
}
