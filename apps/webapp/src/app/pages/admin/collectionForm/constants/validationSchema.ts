import * as yup from 'yup';

import { IMAGE_UPLOAD_VALIDATION_ELEMENT } from '@components/imageUpload/constants';
import { MAX_NAME_LENGTH, MAX_TEXT_LENGTH } from '@utils/constants';

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string()
    .required('This field can not be empty')
    .min(1, 'Title must be at least 1 characters')
    .max(MAX_NAME_LENGTH, `Title must be at most ${MAX_NAME_LENGTH} characters`),
  subtitle: yup.string()
    .required('This field can not be empty')
    .min(1, 'Subtitle must be at least 1 characters')
    .max(MAX_NAME_LENGTH, `Subtitle must be at most ${MAX_NAME_LENGTH} characters`),
  imageUrl: IMAGE_UPLOAD_VALIDATION_ELEMENT,
  description: yup.string()
    .required('This field can not be empty')
    .min(2, 'Description must be at least 2 characters')
    .max(MAX_TEXT_LENGTH, `Description must be at most ${MAX_TEXT_LENGTH} characters`),
  books: yup.array()
    .min(2, 'Minimum amount of books in collection is 2')
});
