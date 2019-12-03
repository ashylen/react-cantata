import React, { useEffect, useState } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

// Utils
import { fetchTrips } from '../../actions/tripsActions';
import styles from './TripsView.module.scss';
import { deleteTrip } from '../../actions/tripsActions';
import { openTripsModal, closeTripsModal } from '../../actions/modalActions';
import fadeTransition from '../../utilities/CSS/Transitions/fade.module.scss';

// Components
import Tile from '../../components/complex/Tile/Tile';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import MainTemplate from '../../templates/MainTemplate';
import AddTripsForm from '../../components/complex/AddTripsForm/AddTripsForm';
import Modal from '../../components/complex/Modal/Modal';

const TripsView = () => {
  const { isModalOpen } = useSelector(state => ({
    isModalOpen: state.modals.trips.isModalOpen,
  }));
  const { trips } = useSelector(state => ({ trips: state.trips.trips }));
  const { user } = useSelector(state => ({ user: state.users.user }));
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTrips());
      setIsFetching(false);
    };

    fetchData();
  }, []);

  const handleTripDelete = async id => {
    setIsFetching(true);

    if (window.confirm('Na pewno chcesz usunąć ten element?')) {
      try {
        await dispatch(deleteTrip(id));
        await dispatch(fetchTrips());
        setIsFetching(false);
      } catch (error) {
        throw new Error(error);
      }
    } else {
      setIsFetching(false);
    }
  };

  return (
    <MainTemplate>
      <Preloader active={isFetching} />
      <section>
        <article className={styles.container}>
          <SectionTitle textCustomize="gradient">Wyjazdy</SectionTitle>
          <div className={styles.tripsWrapper}>
            {!!trips && trips.length > 0 ? (
              trips.map(trip => (
                <div className={styles.trip}>
                  {!!user && user.username === 'admin' && (
                    <Button
                      type="button"
                      cssClass="absoluteTRLight"
                      onClick={() => handleTripDelete(trip.id)}
                    >
                      Usuń
                    </Button>
                  )}
                  <Tile routeName="trip" key={trip.id} data={trip} />
                </div>
              ))
            ) : (
              <div className={styles.trip}>Brak elementów w tej sekcji</div>
            )}
          </div>
        </article>
        {!!user && user.username === 'admin' && (
          <Button
            cssClass="buttonFixed"
            onClick={() => {
              dispatch(openTripsModal());
            }}
          >
            +
          </Button>
        )}
        <CSSTransition
          in={isModalOpen}
          timeout={350}
          classNames={{ ...fadeTransition }}
          unmountOnExit
        >
          <Modal closeModalFn={() => dispatch(closeTripsModal())}>
            <AddTripsForm closeModalFn={() => dispatch(closeTripsModal())} />
          </Modal>
        </CSSTransition>
      </section>
    </MainTemplate>
  );
};

export default TripsView;
