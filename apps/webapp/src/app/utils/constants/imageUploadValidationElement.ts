import * as yup from 'yup';

export const IMAGE_URL_REGEXP = new RegExp(`(http(s?):)([\\s|\\S])*\\.(?:jpg|jpeg|png)`);
export const IMAGE_UPLOAD_VALIDATION_ELEMENT = yup.string().matches(IMAGE_URL_REGEXP, 'Invalid url');
export const URL_REGEXP = new RegExp(`(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})`);
