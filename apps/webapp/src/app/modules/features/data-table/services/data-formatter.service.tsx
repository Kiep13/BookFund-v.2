import moment from 'moment';

import { DATE_FORMAT } from '../constants';
import { CellTypes } from '../enums';

class DataFormatterService {
  public formatData(data: string | number | Date, type: CellTypes): string {
    switch(type) {
      case CellTypes.Date: {
        return moment(data).startOf('day').format(DATE_FORMAT);
      }
      case CellTypes.Number:
      case CellTypes.String: {
        return data.toString();
      }
    }
  }
}

const dataFormatterService = new DataFormatterService();
export default dataFormatterService;
