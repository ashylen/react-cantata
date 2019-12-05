import React, { useEffect, useState } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

// Utils
import { fetchDictionary } from '../../actions/dictionaryActions';
import styles from './DictionaryView.module.scss';
import { deleteDictionary } from '../../actions/dictionaryActions';
import { openDictionaryModal, closeDictionaryModal } from '../../actions/modalActions';
import fadeTransition from '../../utilities/CSS/Transitions/fade.module.scss';

// Components
import Tile from '../../components/complex/Tile/Tile';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import MainTemplate from '../../templates/MainTemplate';
import AddDictionaryForm from '../../components/complex/AddDictionaryForm/AddDictionaryForm';
import Modal from '../../components/complex/Modal/Modal';

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
            {dictionary &&
              dictionary.map(item => (
                <div className={styles.dictionary} key={item.id}>
                  {item && (
                    <div id={item.id} className={styles.dictionaryWrapper}>
                      <SectionTitle textCustomize="gradient">#{item.keyword}</SectionTitle>
                      <p className={styles.text}>{item.description}</p>
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
              ))}

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
            <AddDictionaryForm closeModalFn={() => dispatch(closeDictionaryModal())} />
          </Modal>
        </CSSTransition>
      </section>
    </MainTemplate>
  );
};

export default DictionaryView;
