import React, { Component } from 'react';

// Modules
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { bindActionCreators } from 'redux';

// Utilities
import styles from './SpecimensView.module.scss';

import { fetchSpecimens as fetchSpecimensAction } from '../../actions/specimensActions';
import {
  openSpecimensModal as openSpecimensModalAction,
  closeSpecimensModal as closeSpecimensModalAction,
} from '../../actions/modalActions';
import fadeTransition from '../../utilities/CSS/Transitions/fade.module.scss';

// Components
import Box from '../../components/complex/Box/Box';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import SectionDescription from '../../components/complex/SectionDescription/SectionDescription';
import TimelineHeader from '../../components/complex/TimelineHeader/TimelineHeader';
import Button from '../../components/simple/Button/Button';
import Modal from '../../components/complex/Modal/Modal';

class SpecimensView extends Component {
  componentDidMount() {
    const { fetchSpecimens } = this.props;
    fetchSpecimens();
  }

  render() {
    const { specimens, isModalOpen, openSpecimensModal, closeSpecimensModal } = this.props;

    return (
      <React.Fragment>
        <CSSTransition
          in={isModalOpen}
          timeout={350}
          classNames={{ ...fadeTransition }}
          unmountOnExit
        >
          <Modal closeModalFn={closeSpecimensModal} />
        </CSSTransition>
        <article id="specimens" className={styles.article}>
          <div className={styles.wrapper}>
            <SectionTitle textCustomize="gradient">Okazy</SectionTitle>
            <SectionDescription>
              Poniżej przedstawione zostały poszczególne okazy, które udało się nam znaleźć.
            </SectionDescription>

            {specimens
              ? specimens.map(item => (
                  <div className={styles.inner} key={item.id}>
                    <div className={styles.description}>
                      <TimelineHeader secondary title={item.family}>
                        {item.subText}
                      </TimelineHeader>
                      <Box title={item.title} description={item.description} />

                      <Button
                        cssClass="absoluteTR"
                        onClick={() => {
                          openSpecimensModal(true, item.id);
                        }}
                      >
                        Edit
                      </Button>
                    </div>

                    <div className={styles.image}>
                      <img src={`${process.env.REACT_APP_API_URL}${item.image.url}`} />
                    </div>
                  </div>
                ))
              : null}

            <Button
              cssClass="buttonFixed"
              onClick={() => {
                openSpecimensModal(false, null);
              }}
            >
              +
            </Button>
          </div>
        </article>
      </React.Fragment>
    );
  }
}

SpecimensView.defaultProps = {
  specimens: [],
};

SpecimensView.propTypes = {
  fetchSpecimens: PropTypes.func.isRequired,
  openSpecimensModal: PropTypes.func.isRequired,
  closeSpecimensModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  specimens: PropTypes.arrayOf(
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
  const { specimens } = state.specimens;
  const { isModalOpen } = state.modals.specimens;

  return { specimens, isModalOpen };
};

const mapDispatchToProps = dispatch => ({
  fetchSpecimens: () => dispatch(fetchSpecimensAction()),
  openSpecimensModal: (isEditMode, idCurrentItem) =>
    dispatch(openSpecimensModalAction(isEditMode, idCurrentItem)),
  closeSpecimensModal: bindActionCreators(closeSpecimensModalAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SpecimensView);
