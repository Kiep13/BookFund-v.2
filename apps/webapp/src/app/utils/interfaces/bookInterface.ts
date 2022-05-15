import { IAuthor } from './authorInterface';
import { IFavorite } from './favoriteInterface';
import { IGenre } from './genre.interface';

export interface IBook {
  id: number;
  amountPages: number;
  avgRate: number;
  description?: string;
  image: string;
  title: string;
  year: number;
  author: IAuthor;
  authorId?: number;
  createdAt?: Date;
  genres?: IGenre[];
  fileName?: string;
  fileUrl?: string;
  isCommented?: boolean;
  authorFullName?: string;
  updatedAt?: Date;
  favorite?: IFavorite;
}
