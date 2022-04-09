import * as moment from 'moment';

import { IDateRange } from '@core/interfaces';
import { DATE_API_FORMAT, DATE_DATABASE_FORMAT } from '@core/constants';

class DateService {
  public transformFromApiToRangeDates(apiDate: string): IDateRange {
    const date = moment(apiDate, DATE_API_FORMAT).toDate();
    const startDate = moment(date).startOf('month').startOf('date').format(DATE_DATABASE_FORMAT);
    const endDate = moment(date).endOf('month').endOf('date').format(DATE_DATABASE_FORMAT);

    return {
      startDate,
      endDate
    }
  }

  public transformFromApiToRangeDatesWithPreviousMonth(apiDate: string): IDateRange {
    const date = moment(apiDate, DATE_API_FORMAT).toDate();
    const startDate = moment(date).subtract(1, 'month').startOf('month').startOf('date').format(DATE_DATABASE_FORMAT);
    const endDate = moment(date).endOf('month').endOf('date').format(DATE_DATABASE_FORMAT);

    return {
      startDate,
      endDate
    }
  }

  public getMonthFromDbDate(date: string): number {
    return moment(date, DATE_DATABASE_FORMAT).get('month')  + 1;
  }
}

export const dateService = new DateService();
