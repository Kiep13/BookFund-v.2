import * as yup from 'yup';

import { URL_REGEXP } from '@utils/constants';

export const VALIDATION_SCHEMA = yup.object().shape({
  url: yup.string()
    .required('This field can not be empty')
    .matches(URL_REGEXP, 'Invalid url'),
  folder: yup.number()
    .required('This field can not be empty')
});
