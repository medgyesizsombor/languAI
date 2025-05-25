/* tslint:disable */
/* eslint-disable */
import { CardListViewModel } from '../models/card-list-view-model';
import { OtherUserViewModel } from '../models/other-user-view-model';
import { UserViewModel } from '../models/user-view-model';
export interface ProfilePageDataViewModel {
  cardList?: Array<CardListViewModel> | null;
  friendList?: Array<OtherUserViewModel> | null;
  user?: UserViewModel;
}
