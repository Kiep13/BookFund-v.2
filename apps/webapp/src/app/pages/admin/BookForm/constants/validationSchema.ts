import * as yup from 'yup';

import { IMAGE_UPLOAD_VALIDATION_ELEMENT, MAX_NAME_LENGTH, MAX_TEXT_LENGTH } from '@utils/constants';

const currentYear = (new Date()).getFullYear();

export const VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string()
    .required('This field can not be empty')
    .min(1, 'Title must be at least 1 characters')
    .max(MAX_NAME_LENGTH, `Title must be at most ${MAX_NAME_LENGTH} characters`),
  fileName: yup.string()
    .required('This field can not be empty'),
  author: yup.object()
    .required('This field can not be empty'),
  year: yup.number()
    .required('This field can not be empty')
    .min(1950, 'Year must be at least 1950')
    .max(currentYear, `Year must be at most ${currentYear}`),
  imageUrl: IMAGE_UPLOAD_VALIDATION_ELEMENT,
  description: yup.string()
    .required('This field can not be empty')
    .min(2, 'Description must be at least 2 characters')
    .max(MAX_TEXT_LENGTH, `Description must be at most ${MAX_TEXT_LENGTH} characters`)
});
