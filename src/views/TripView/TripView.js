import React, { useEffect, useState } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

// Utils
import { routes } from '../../routes';
import { fetchTrip } from '../../actions/tripsActions';
import styles from './TripView.module.scss';

// Components
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';

const TripView = props => {
  const { trip } = useSelector(state => ({ trip: state.trips.trip }));
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchTrip(params.id));
      setIsFetching(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Preloader active={isFetching} />
      <Header />
      <section>
        <article className={styles.container}>
          <div className={styles.tripsWrapper}>
            <SectionTitle textCustomize="gradient">{trip && trip.title}</SectionTitle>
            <p className={styles.text}>{trip && trip.content}</p>

            <div className={styles.galleryWrapper}>
              {trip &&
                trip.gallery_images.map(image => (
                  <picture className={styles.image}>
                    <a
                      href={`${process.env.REACT_APP_API_URL}${image.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={`${process.env.REACT_APP_API_URL}${image.url}`} alt={image.name} />
                    </a>
                  </picture>
                ))}
            </div>
          </div>
          <br />
          <Link className={styles.absoluteLink} to={routes.trips}>
            <Button type="button">Powrót</Button>
          </Link>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default TripView;
