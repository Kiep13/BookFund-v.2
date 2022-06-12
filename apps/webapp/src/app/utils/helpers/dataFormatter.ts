import moment from 'moment';

import { DATE_TABLE_FORMAT } from '@utils/constants';
import { DataTypes } from '@utils/enums';

export function formatData(data: string | number | Date, type: DataTypes): string {
  if (!data && type !== DataTypes.Float) {
    return '---';
  }

  switch (type) {
    case DataTypes.Date: {
      return moment(data).startOf('day').format(DATE_TABLE_FORMAT);
    }
    case DataTypes.Float: {
      return Number(data).toFixed(1);
    }
    case DataTypes.Number:
    case DataTypes.String: {
      return data.toString();
    }
  }

}
