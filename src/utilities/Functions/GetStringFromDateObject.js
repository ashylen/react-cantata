import format from 'date-fns/format';
import { DATE_FORMAT } from '../../constants/DateFormat';

export const GetStringFromDateObject = item => {
  if (typeof item === 'object' && item !== null) {
    item = format(item, DATE_FORMAT);
  }

  return item;
};

