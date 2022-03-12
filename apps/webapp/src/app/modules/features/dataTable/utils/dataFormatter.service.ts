import moment from 'moment';

import { DATE_FORMAT } from '../constants';
import { CellTypes } from '../enums';

export function formatData(data: string | number | Date, type: CellTypes): string {
  if (!data && type !== CellTypes.Float) {
    return '---';
  }

  switch (type) {
    case CellTypes.Date: {
      return moment(data).startOf('day').format(DATE_FORMAT);
    }
    case CellTypes.Float: {
      return Number(data).toFixed(1);
    }
    case CellTypes.Number:
    case CellTypes.String: {
      return data.toString();
    }
  }

}
