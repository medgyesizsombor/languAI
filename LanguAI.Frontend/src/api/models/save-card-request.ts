/* tslint:disable */
/* eslint-disable */
import { CardViewModel } from '../models/card-view-model';
export interface SaveCardRequest {
  cardListId?: number;
  cards?: Array<CardViewModel> | null;
}
