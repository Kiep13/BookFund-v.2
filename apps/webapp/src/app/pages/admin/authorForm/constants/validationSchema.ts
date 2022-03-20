import * as yup from 'yup';

import { IMAGE_UPLOAD_VALIDATION_ELEMENT } from '@components/imageUpload/constants';
import { MAX_NAME_LENGTH, MAX_TEXT_LENGTH, NAME_REGEXP } from '@utils/constants';

import { VALIDATION_ERROR_MESSAGES } from './validationErrorMessages';

export const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string()
    .required('This field can not be empty')
    .min(2, 'Name must be at least 2 characters')
    .max(MAX_NAME_LENGTH, `Name must be at most ${MAX_NAME_LENGTH} characters`)
    .matches(NAME_REGEXP, VALIDATION_ERROR_MESSAGES.nameMatches),
  surname: yup.string()
    .required('This field can not be empty')
    .min(2, 'Surname must be at least 2 characters')
    .max(MAX_NAME_LENGTH, `Surname must be at most ${MAX_NAME_LENGTH} characters`)
    .matches(NAME_REGEXP, VALIDATION_ERROR_MESSAGES.surnameMatches),
  imageUrl: IMAGE_UPLOAD_VALIDATION_ELEMENT,
  biography: yup.string()
    .required('This field can not be empty')
    .min(2, 'Biography must be at least 2 characters')
    .max(MAX_TEXT_LENGTH, `Biography must be at most ${MAX_TEXT_LENGTH} characters`)
});
