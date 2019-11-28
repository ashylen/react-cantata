import React from 'react';

// Modules
import PropTypes from 'prop-types';

// Utilities
import styles from './SummaryList.module.scss';

// Components
import TimelineHeader from '../TimelineHeader/TimelineHeader';

const SummaryList = ({ data }) => {
  const { header, href, date, subText, youTubeUrl, text } = data;

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <TimelineHeader title="Composition name">{header}</TimelineHeader>
        <TimelineHeader title="Link">{href}</TimelineHeader>
        <TimelineHeader title="Date">{date}</TimelineHeader>
        <TimelineHeader title="Additional text">{subText}</TimelineHeader>
        <TimelineHeader title="Youtube URL">{youTubeUrl}</TimelineHeader>
        <TimelineHeader title="Text">{text}</TimelineHeader>
      </div>
    </React.Fragment>
  );
};

SummaryList.defaultProps = {
  data: {
    header: "",
    text: "",
    href: "",
    date: "",
    youTubeUrl: "",
    subText: "",
  }
};

SummaryList.propTypes = {
  data: PropTypes.shape({
    header: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    youTubeUrl: PropTypes.string,
    subText: PropTypes.string,
  }),
};

export default SummaryList;
