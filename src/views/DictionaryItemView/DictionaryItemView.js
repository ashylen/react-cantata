import React, { useEffect, useState } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

// Utils
import { routes } from '../../routes';
import { fetchDictionaryItem } from '../../actions/dictionaryActions';
import styles from './DictionaryItemView.module.scss';

// Components
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import MainTemplate from '../../templates/MainTemplate';

const DictionaryItemView = () => {
  const { dictionaryItem } = useSelector(state => ({
    dictionaryItem: state.dictionary.dictionaryItem,
  }));

  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDictionaryItem(params.id));
      setIsFetching(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <MainTemplate>
      <Preloader active={isFetching} />
      <section>
        <div className={styles.dictionary}>
          <article className={styles.container}>
            <div className={styles.dictionary} key={dictionaryItem.id}>
              <SectionTitle textCustomize="gradient">{dictionaryItem.keyword}</SectionTitle>
              <p className={styles.text}>{dictionaryItem.description}</p>
            </div>
            <br />
            <Link className={styles.absoluteLink} to={routes.dictionary}>
              <Button type="button">Powrót</Button>
            </Link>
          </article>
        </div>
      </section>
    </MainTemplate>
  );
};

export default DictionaryItemView;
