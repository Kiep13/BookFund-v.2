;import { Request, Response } from 'express';

import { UNEXPECTED_ERROR } from '@core/constants';
import { ResponseStatuses } from '@core/enums';
import { ApiError } from '@exceptions/api-error';
import { ParseError } from '@exceptions/parse-error'

export const errorMiddleware = (error: any, request: Request, response: Response, next: Function): Response => {
  if(error instanceof ApiError || (error.status === ResponseStatuses.STATUS_NOT_AUTHORIZED || error.message)) {
    return response.status(error.status || ResponseStatuses.STATUS_ERROR).json({
      message: error.message,
      errors: error.errors
    });
  } else if(error instanceof ParseError) {
    return response.status(error.status).json({
      message: error.message,
      errors: error.errors
    });
  } else if (error.errors && error.errors.length > 0) {
    const errorsMessage = error.errors.map((item) => {
      return item.message;
    }).join('. ');

    return response.status(ResponseStatuses.STATUS_ERROR).json({
      message: errorsMessage,
      errors: error.errors
    });
  }

  return response.status(ResponseStatuses.STATUS_ERROR).json({message: UNEXPECTED_ERROR});
}
