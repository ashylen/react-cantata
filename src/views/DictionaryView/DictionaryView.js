import React, { useEffect, useState } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

// Utils
import { fetchDictionary } from '../../actions/dictionaryActions';
import styles from './DictionaryView.module.scss';
import { deleteDictionary } from '../../actions/dictionaryActions';
import { openDictionaryModal, closeDictionaryModal } from '../../actions/modalActions';
import fadeTransition from '../../utilities/CSS/Transitions/fade.module.scss';
import { routes } from '../../routes';

// Components
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import MainTemplate from '../../templates/MainTemplate';
import AddDictionaryForm from '../../components/complex/AddDictionaryForm/AddDictionaryForm';
import Modal from '../../components/complex/Modal/Modal';
import SectionDescription from '../../components/complex/SectionDescription/SectionDescription';

const DictionaryView = () => {
  const { isModalOpen } = useSelector(state => ({
    isModalOpen: state.modals.dictionary.isModalOpen,
  }));
  const { dictionary } = useSelector(state => ({ dictionary: state.dictionary.dictionary }));
  const { user } = useSelector(state => ({ user: state.users.user }));
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchDictionary());
      setIsFetching(false);
    };

    fetchData();
  }, []);

  const handleDictionaryDelete = async id => {
    setIsFetching(true);

    if (window.confirm('Na pewno chcesz usunąć ten element?')) {
      try {
        await dispatch(deleteDictionary(id));
        await dispatch(fetchDictionary());
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
        <div className={styles.dictionary}>
          <article className={styles.container}>
            <SectionTitle textCustomize="gradient">SŁOWNIK</SectionTitle>
            {dictionary && dictionary.length > 0 ? (
              dictionary.map(item => (
                <div className={styles.dictionaryItem} key={item.id}>
                  {item && (
                    <div id={item.id} className={styles.dictionaryWrapper}>
                      <Link
                        key={item.id}
                        className={styles.dictionaryLink}
                        title={item.hover_text}
                        to={routes.dictionaryItem(item.id)}
                      >
                        <SectionDescription left>{item.keyword}</SectionDescription>
                      </Link>
                      <p className={styles.text}>{item.short_text}</p>
                      <br />
                    </div>
                  )}

                  {!!user && user.username === 'admin' && (
                    <Button
                      type="button"
                      cssClass="absoluteTRLight"
                      onClick={() => handleDictionaryDelete(item.id)}
                    >
                      Usuń
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.trip}>Brak elementów w tej sekcji</div>
            )}

            <br />
          </article>
        </div>
        {!!user && user.username === 'admin' && (
          <Button
            cssClass="buttonFixed"
            onClick={() => {
              dispatch(openDictionaryModal());
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
          <Modal closeModalFn={() => dispatch(closeDictionaryModal())}>
            <AddDictionaryForm
              dictionary={dictionary}
              closeModalFn={() => dispatch(closeDictionaryModal())}
            />
          </Modal>
        </CSSTransition>
      </section>
    </MainTemplate>
  );
};

export default DictionaryView;
