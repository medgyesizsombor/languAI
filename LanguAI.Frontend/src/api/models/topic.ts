/* tslint:disable */
/* eslint-disable */
import { CardList } from '../models/card-list';
import { LanguageLevelEnum } from '../models/language-level-enum';
export interface Topic {
  cardLists?: Array<CardList> | null;
  description: string;
  descriptionInHun: string;
  id: number;
  languageLevel: LanguageLevelEnum;
  name: string;
  nameInHun: string;
}
