import * as yup from 'yup';

import { MAX_NAME_LENGTH, MAX_TEXT_LENGTH } from '@core/constants';
import { IMAGE_UPLOAD_VALIDATION_ELEMENT } from '@features/imageUpload/constants';

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string()
    .required('This field can not be empty')
    .min(1, 'Title must be at least 1 characters')
    .max(MAX_NAME_LENGTH, `Title must be at most ${MAX_NAME_LENGTH} characters`),
  imageUrl: IMAGE_UPLOAD_VALIDATION_ELEMENT,
  description: yup.string()
    .required('This field can not be empty')
    .min(2, 'Biography must be at least 2 characters')
    .max(MAX_TEXT_LENGTH, `Biography must be at most ${MAX_TEXT_LENGTH} characters`),
  books: yup.array()
    .min(2, 'Minimum amount of books in collection is 2')
});
