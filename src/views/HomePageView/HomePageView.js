import React, { Component } from 'react';

// Modules
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { bindActionCreators } from 'redux';

// Utilities
import styles from './HomePageView.module.scss';

import * as specimensActions from '../../actions/specimensActions';
import * as modalsActions from '../../actions/modalActions';
import fadeTransition from '../../utilities/CSS/Transitions/fade.module.scss';

// Components
import Box from '../../components/complex/Box/Box';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import SectionDescription from '../../components/complex/SectionDescription/SectionDescription';
import TimelineHeader from '../../components/complex/TimelineHeader/TimelineHeader';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import Modal from '../../components/complex/Modal/Modal';
import ContactView from '../ContactView/ContactView';
import MainTemplate from '../../templates/MainTemplate';

class HomePageView extends Component {
  state = {
    isFetching: true,
  };

  async componentDidMount() {
    const { fetchSpecimens } = this.props;

    try {
      await fetchSpecimens();
      this.setState({ isFetching: false });
    } catch (error) {
      throw new Error(error);
    }
  }

  handleSpecimenDelete = async id => {
    const { deleteSpecimen, fetchSpecimens } = this.props;
    this.setState({ isFetching: true });

    if (window.confirm('Na pewno chcesz usunąć ten element?')) {
      try {
        await deleteSpecimen(id);
        await fetchSpecimens();
        this.setState({ isFetching: false });
      } catch (error) {
        throw new Error(error);
      }
    } else {
      this.setState({ isFetching: false });
    }
  };

  render() {
    const { specimens, user, isModalOpen, openSpecimensModal, closeSpecimensModal } = this.props;

    return (
      <MainTemplate isHomePage>
        <Preloader active={this.state.isFetching} />

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

            {!!specimens
              ? specimens.map(item => (
                  <div className={styles.inner} key={item.id}>
                    <div className={classNames(styles.description, { [styles.full]: !item.image })}>
                      <TimelineHeader secondary title={item.family}>
                        {item.subText}
                      </TimelineHeader>
                      <Box title={item.title} description={item.description} />

                      {!!user && user.username === 'admin' && (
                        <Button
                          cssClass="absoluteTR"
                          onClick={() => this.handleSpecimenDelete(item.id)}
                        >
                          Usuń
                        </Button>
                      )}
                    </div>
                    {item.image && (
                      <div className={styles.image}>
                        <img src={`${process.env.REACT_APP_API_URL}${item.image.url}`} />
                      </div>
                    )}
                  </div>
                ))
              : null}

            {!!user && user.username === 'admin' && (
              <Button
                cssClass="buttonFixed"
                onClick={() => {
                  openSpecimensModal(false, null);
                }}
              >
                +
              </Button>
            )}
          </div>
        </article>
        <ContactView />
      </MainTemplate>
    );
  }
}

HomePageView.defaultProps = {
  specimens: [],
};

HomePageView.propTypes = {
  fetchSpecimens: PropTypes.func.isRequired,
  openSpecimensModal: PropTypes.func.isRequired,
  closeSpecimensModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  specimens: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
};

const mapStateToProps = state => {
  const { specimens } = state.specimens;
  const { user } = state.users;
  const { isModalOpen } = state.modals.specimens;

  return { specimens, isModalOpen, user };
};

const mapDispatchToProps = dispatch => ({
  deleteSpecimen: bindActionCreators(specimensActions.deleteSpecimen, dispatch),
  fetchSpecimens: bindActionCreators(specimensActions.fetchSpecimens, dispatch),
  closeSpecimensModal: bindActionCreators(modalsActions.closeSpecimensModal, dispatch),
  openSpecimensModal: bindActionCreators(modalsActions.openSpecimensModal, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageView);
