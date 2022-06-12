import { Roles } from '@utils/enums';

export interface IUser {
  createdAt: Date;
  fullName: string;
  id: number;
  image: string;
  name: string;
  provider: string;
  role: Roles;
  surname: string;
  articlesAmount?: number;
  commentsAmount?: number;
  doneFavoritesAmount?: number;
  favoritesAmount?: number;
  inProgressFavoritesAmount?: number;
}
