/* tslint:disable */
/* eslint-disable */
import { CardList } from '../models/card-list';
import { Learning } from '../models/learning';
export interface Language {
  code: string;
  id: number;
  learningLanguageOfCardLists?: Array<CardList> | null;
  learningLanguageOfLearnings?: Array<Learning> | null;
  name: string;
  nameInHun: string;
  nativeLanguageOfCardLists?: Array<CardList> | null;
  nativeLanguageOfLearnings?: Array<Learning> | null;
}
