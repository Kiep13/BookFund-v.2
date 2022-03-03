import * as yup from 'yup';

import { GENRE_NAME_REGEXP, MAX_NAME_LENGTH } from '@core/constants';

import { VALIDATION_ERROR_MESSAGES } from '../constants';

export const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string()
    .required('This field can not be empty')
    .min(2, 'Name must be at least 2 characters')
    .max(MAX_NAME_LENGTH, `Name must be at most ${MAX_NAME_LENGTH} characters`)
    .matches(GENRE_NAME_REGEXP, VALIDATION_ERROR_MESSAGES.nameMatches),
});
