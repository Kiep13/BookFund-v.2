import moment from 'moment';

import { DATE_FORMAT } from '../constants';
import { CellTypes } from '../enums';

export function formatData(data: string | number | Date, type: CellTypes): string {
  if (!data) {
    return '---';
  }

  switch (type) {
    case CellTypes.Date: {
      return moment(data).startOf('day').format(DATE_FORMAT);
    }
    case CellTypes.Number:
    case CellTypes.String: {
      return data.toString();
    }
  }

}
