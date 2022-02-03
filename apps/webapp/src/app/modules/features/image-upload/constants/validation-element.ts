import * as yup from 'yup';

import { IMAGE_URL_REGEXP } from './image-url-regexp';

export const IMAGE_UPLOAD_VALIDATION_ELEMENT = yup.string().matches(IMAGE_URL_REGEXP, 'Invalid url');
