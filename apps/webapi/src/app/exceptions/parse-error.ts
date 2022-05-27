import { PARSE_ERROR } from '@core/constants';
import { ResponseStatuses } from '@core/enums';

export class ParseError extends Error {
  public status: ResponseStatuses;
  public errors: Error[];

  constructor(status: ResponseStatuses, message: string, errors: Error[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static ParseFailed() {
    return new ParseError(ResponseStatuses.STATUS_ERROR, PARSE_ERROR);
  }
}
