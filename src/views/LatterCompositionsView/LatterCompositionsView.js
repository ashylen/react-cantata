import React, { Component } from 'react';

// Modules
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import { CSSTransition } from 'react-transition-group';
import { bindActionCreators } from 'redux';

// Utilities
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './LatterCompositionsView.module.scss';

import { GetYouTubeVideoId } from '../../utilities/Functions/GetYouTubeVideoId';
import { fetchCompositions as fetchCompositionsAction } from '../../actions/compositionActions';
import {
  openCompositionsModal as openCompositionsModalAction,
  closeCompositionsModal as closeCompositionsModalAction,
} from '../../actions/modalActions';
import fadeTransition from '../../utilities/CSS/Transitions/fade.module.scss';

// Components
import Box from '../../components/complex/Box/Box';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import SectionDescription from '../../components/complex/SectionDescription/SectionDescription';
import TimelineHeader from '../../components/complex/TimelineHeader/TimelineHeader';
import Button from '../../components/simple/Button/Button';
import Modal from '../../components/complex/Modal/Modal';

class LatterCompositionsView extends Component {
  componentDidMount() {
    const { fetchCompositions } = this.props;
    fetchCompositions();
  }

  render() {
    const { compositions, isModalOpen, openCompositionsModal, closeCompositionsModal } = this.props;

    return (
      <React.Fragment>
        <CSSTransition
          in={isModalOpen}
          timeout={350}
          classNames={{ ...fadeTransition }}
          unmountOnExit
        >
          <Modal closeModalFn={closeCompositionsModal} />
        </CSSTransition>
        <article id="latter-compositions" className={styles.article}>
          <div className={styles.wrapper}>
            <SectionTitle textCustomize='gradient'>Latter Compositions </SectionTitle>
            <SectionDescription>
              &quot;It&#39;s Time&quot; was released as the lead single from Continued Silence and
              It&#39;s Time, both extended plays preceding Night Visions&#39; release.
            </SectionDescription>

            {compositions
              ? compositions.map(item => (
                  <div className={styles.inner} key={item.id}>
                    <div className={styles.description}>
                      <TimelineHeader secondary title={item.date}>
                        {item.subText}
                      </TimelineHeader>
                      <Box
                        header={item.header}
                        text={item.text}
                        buttonText="Visit on iTunes"
                        buttonHref={item.href}
                        socialBoxContent={item}
                      />

                      <Button
                        cssClass="absoluteTR"
                        onClick={() => {
                          openCompositionsModal(true, item.id);
                        }}
                      >
                        Edit
                      </Button>
                    </div>

                    <div className={styles.video}>
                      {item.youTubeUrl && <YouTube videoId={GetYouTubeVideoId(item.youTubeUrl)} />}
                    </div>
                  </div>
                ))
              : null}

            <Button
              cssClass="buttonFixed"
              onClick={() => {
                openCompositionsModal(false, null);
              }}
            >
              <FontAwesomeIcon icon={faPlus} color="#abacac" size="1x" />
            </Button>
          </div>
        </article>
      </React.Fragment>
    );
  }
}

LatterCompositionsView.defaultProps = {
  compositions: [],
};

LatterCompositionsView.propTypes = {
  fetchCompositions: PropTypes.func.isRequired,
  openCompositionsModal: PropTypes.func.isRequired,
  closeCompositionsModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  compositions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      youTubeUrl: PropTypes.string.isRequired,
      subText: PropTypes.string.isRequired,
    }),
  ),
};

const mapStateToProps = state => {
  const { compositions } = state.compositionsReducer;
  const { isModalOpen } = state.modalReducer.compositions;

  return { compositions, isModalOpen };
};

const mapDispatchToProps = dispatch => ({
  fetchCompositions: () => dispatch(fetchCompositionsAction()),
  openCompositionsModal: (isEditMode, idCurrentItem) =>
    dispatch(openCompositionsModalAction(isEditMode, idCurrentItem)),
  closeCompositionsModal: bindActionCreators(closeCompositionsModalAction, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LatterCompositionsView);
