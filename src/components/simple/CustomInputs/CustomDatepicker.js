import React from 'react';

// Modules
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

// Utilities
import styles from './CustomDatepicker.module.scss';
import { DATE_FORMAT } from '../../../constants/DateFormat';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const CustomDatepicker = props => {
  const {
    input,
    label,
    meta: { touched, error },
  } = props;

  const isErrorShown = touched && error;
  const formItemClass = isErrorShown ? styles.formItemError : styles.formItem;

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <DayPickerInput
          placeholder={label}
          inputProps={{ className: formItemClass }}
          formatDate={formatDate}
          format={DATE_FORMAT}
          parseDate={parseDate}
          onDayChange={input.onChange}
          value={input.value}
          name={input.name}
        />
        {isErrorShown ? <div className={styles.errorContainer}>{error}</div> : null}
      </div>
    </React.Fragment>
  );
};

export default CustomDatepicker;
