import { IBookForm } from '../interfaces';

export const FORM_INITIAL_VALUE: IBookForm = {
  title: '',
  amountPages: 0,
  year: (new Date()).getFullYear(),
  genres: [],
  description: '',
  imageUrl: '',
  imageFile: undefined,
}
