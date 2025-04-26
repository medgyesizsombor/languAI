/* tslint:disable */
/* eslint-disable */
import { CardList } from '../models/card-list';
import { Friendship } from '../models/friendship';
import { Gameplay } from '../models/gameplay';
import { Image } from '../models/image';
import { Interaction } from '../models/interaction';
import { Learning } from '../models/learning';
import { Message } from '../models/message';
import { Post } from '../models/post';
export interface User {
  cardLists?: Array<CardList> | null;
  dateOfBirth: string;
  email: string;
  gameplays?: Array<Gameplay> | null;
  id: number;
  image?: Image;
  imageId?: number | null;
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
  streak?: number;
  username: string;
}
