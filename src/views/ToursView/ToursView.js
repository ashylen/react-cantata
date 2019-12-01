import React, { Component } from 'react';

// Modules
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utilities
import styles from './ToursView.module.scss';
import { fetchTours as fetchToursAction } from '../../actions/toursActions';
import toursBg from '../../assets/images/tours-bg.png';

// Components
import Box from '../../components/complex/Box/Box';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import SectionDescription from '../../components/complex/SectionDescription/SectionDescription';
import TimelineHeader from '../../components/complex/TimelineHeader/TimelineHeader';

class ToursView extends Component {
  componentDidMount() {
    const { fetchTours } = this.props;
    fetchTours();
  }

  render() {
    const { tours } = this.props;

    return (
      <React.Fragment>
        <article
          id="concert_tours"
          className={styles.article}
          style={{ backgroundImage: `url(${toursBg})` }}
        >
          <div className={styles.wrapper}>
            <SectionTitle textCustomize="gradient">Concert Tours</SectionTitle>
            <SectionDescription>
              Before the release of Night Visions, Imagine Dragons made appearances on American
              radio and television to promote their extended play, Continued Silence and debut
              single It&#39;s Time. The band performed &quot;It&#39;s Time&quot; on the July 16,
              2012 airing of NBC late-night talk show The Tonight Show with Jay Leno
            </SectionDescription>

            {tours
              ? tours.map(item => (
                  <div key={item.id} className={styles.track}>
                    <TimelineHeader title={item.date}>{item.subText}</TimelineHeader>
                    <Box
                      header={item.header}
                      text={item.text}
                      buttonText="Buy online"
                      buttonHref={item.href}
                    />
                  </div>
                ))
              : null}
          </div>
        </article>
      </React.Fragment>
    );
  }
}

ToursView.defaultProps = {
  tours: [],
};

ToursView.propTypes = {
  fetchTours: PropTypes.func.isRequired,
  tours: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      subText: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
  ),
};

const mapStateToProps = state => {
  const { tours } = state.toursReducer;
  const { isModalOpen } = state.modals.specimens;

  return { tours, isModalOpen };
};

const mapDispatchToProps = dispatch => ({
  fetchTours: () => dispatch(fetchToursAction('tours')),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToursView);
