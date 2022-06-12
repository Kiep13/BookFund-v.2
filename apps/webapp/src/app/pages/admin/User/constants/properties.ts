import { DataTypes } from '@utils/enums';

import { IProperty } from '../interfaces';

export const PROPERTIES: IProperty[] = [
  {
    label: 'Registration date',
    fieldName: 'createdAt',
    formatter: DataTypes.Date
  },
  {
    label: 'Registered via',
    fieldName: 'provider',
    formatter: DataTypes.String
  },
  {
    label: 'Books in favorite',
    fieldName: 'favoritesAmount',
    formatter: DataTypes.Number
  },
  {
    label: 'Books in progress',
    fieldName: 'inProgressFavoritesAmount',
    formatter: DataTypes.Number
  },
  {
    label: 'Done books',
    fieldName: 'doneFavoritesAmount',
    formatter: DataTypes.Number
  },
  {
    label: 'Rates',
    fieldName: 'commentsAmount',
    formatter: DataTypes.Number
  },
  {
    label: 'Articles',
    fieldName: 'articlesAmount',
    formatter: DataTypes.Number
  }
];
