/* tslint:disable */
/* eslint-disable */
import { CardList } from '../models/card-list';
import { Friendship } from '../models/friendship';
import { Interaction } from '../models/interaction';
import { Learning } from '../models/learning';
import { Message } from '../models/message';
import { Post } from '../models/post';
export interface User {
  cardLists?: Array<CardList> | null;
  dateOfBirth: string;
  email: string;
  id: number;
  interactions?: Array<Interaction> | null;
  isActive: boolean;
  language: number;
  learnings?: Array<Learning> | null;
  passwordHash: string;
  posts?: Array<Post> | null;
  receivedFriendships?: Array<Friendship> | null;
  receivedMessages?: Array<Message> | null;
  sentFriendships?: Array<Friendship> | null;
  sentMessages?: Array<Message> | null;
  username: string;
}
