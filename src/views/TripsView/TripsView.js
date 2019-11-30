import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchTrips } from '../../actions/tripsActions';

import Tile from '../../components/complex/Tile/Tile';

import styles from './TripsView.module.scss';

// Components
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';

const TripsView = () => {
  const { trips } = useSelector(state => ({ trips: state.tripsReducer.trips }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrips());
  }, []);

  return (
    <>
      <Header />
      <section>
        {console.log(trips)}
        <article className={styles.container}>
          <h1>Wyjazdy</h1>
          <div className={styles.tripsWrapper}>
            {!!trips && trips.map(trip => <Tile routeName="trip" key={trip.id} data={trip} />)}
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default TripsView;
