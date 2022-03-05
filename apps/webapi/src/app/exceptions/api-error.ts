import { NOT_AUTHORIZED } from '@core/constants';
import { ResponseStatuses } from '@core/enums';

export class ApiError extends Error {
  public status: ResponseStatuses;
  public errors: Error[];

  constructor(status: ResponseStatuses, message: string, errors: Error[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(ResponseStatuses.STATUS_NOT_AUTHORIZED, NOT_AUTHORIZED);
  }

  static BadRequest(message: string, errors: Error[] = []) {
    return new ApiError(ResponseStatuses.STATUS_BAD_REQUEST, message, errors);
  }

  static AccountProblems(message: string, errors: Error[] = []) {
    return new ApiError(ResponseStatuses.STATUS_BAD_REQUEST, message, errors);
  }
}
