import React from 'react';

// Modules
import {
  faVolumeDown,
  faHeart,
  faShareSquare,
  faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Utilities
import styles from './SocialBox.module.scss';

// Components
import SocialBoxItem from './SocialBoxItem';

const SocialBox = ({ socialBoxContent }) => {

  const { auditions, likes, comments, shares } = socialBoxContent;
  const items = (
    <React.Fragment>
      <SocialBoxItem icon={faVolumeDown} count={auditions ? auditions.count : 0} />
      <SocialBoxItem icon={faHeart} count={likes ? likes.count : 0} />
      <SocialBoxItem icon={faShareSquare} count={comments ? comments.count : 0} />
      <SocialBoxItem icon={faCommentAlt} count={shares ? shares.count : 0} />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <div className={styles.wrapper}>{items}</div>
    </React.Fragment>
  );
};

SocialBox.propTypes = {
  socialBoxContent: PropTypes.objectOf({
    auditions: PropTypes.shape({ count: PropTypes.number }),
    likes: PropTypes.shape({ count: PropTypes.number }),
    comments: PropTypes.shape({ count: PropTypes.number }),
    shares: PropTypes.shape({ count: PropTypes.number }),
  }),
};

SocialBox.defaultProps = {
  socialBoxContent: {
    auditions: { count: 0 },
    likes: { count: 0 },
    comments: { count: 0 },
    shares: { count: 0 },
  },
};

export default SocialBox;
