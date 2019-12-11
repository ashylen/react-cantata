import React, { useEffect, useState } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

// Utils
import { fetchArticles } from '../../actions/articlesActions';
import styles from './ArticlesView.module.scss';
import { deleteArticle } from '../../actions/articlesActions';
import { openArticlesModal, closeArticlesModal } from '../../actions/modalActions';
import fadeTransition from '../../utilities/CSS/Transitions/fade.module.scss';

// Components
import Tile from '../../components/complex/Tile/Tile';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import MainTemplate from '../../templates/MainTemplate';
import AddArticlesForm from '../../components/complex/AddArticlesForm/AddArticlesForm';
import Modal from '../../components/complex/Modal/Modal';

const ArticlesView = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector(state => ({
    isModalOpen: state.modals.articles.isModalOpen,
  }));
  const { articles } = useSelector(state => ({ articles: state.articles.articles.data }));
  const { articlesCount } = useSelector(state => ({
    articlesCount: state.articles.articles.count,
  }));
  const { user } = useSelector(state => ({ user: state.users.user }));
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    setIsFetching(true);
    const fetchData = async () => {
      await dispatch(fetchArticles(limit, page));
      setIsFetching(false);
    };

    fetchData();
  }, [page, dispatch]);

  const handleArticleDelete = async id => {
    setIsFetching(true);

    if (window.confirm('Na pewno chcesz usunąć ten artykuł?')) {
      try {
        await dispatch(deleteArticle(id));
        await dispatch(fetchArticles(limit, page));
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
          <SectionTitle textCustomize="gradient">Artykuły</SectionTitle>
          <div className={styles.articlesWrapper}>
            {!!articles && articles.length > 0 ? (
              articles.map(article => (
                <div className={styles.article}>
                  {!!user && user.username === 'admin' && (
                    <Button
                      type="button"
                      cssClass="absoluteTRLight"
                      onClick={() => handleArticleDelete(article.id)}
                    >
                      Usuń
                    </Button>
                  )}
                  <Tile routeName="article" key={article.id} data={article} />
                </div>
              ))
            ) : (
              <div className={styles.trip}>Brak elementów w tej sekcji</div>
            )}
          </div>
          <br />
          {articles && articles.length < articlesCount && (
            <Button onClick={() => setPage(page + 1)}>Wczytaj więcej</Button>
          )}
        </article>
        {!!user && user.username === 'admin' && (
          <Button
            cssClass="buttonFixed"
            onClick={() => {
              dispatch(openArticlesModal());
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
          <Modal closeModalFn={() => dispatch(closeArticlesModal())}>
            <AddArticlesForm
              articlesLimit={limit}
              articlesPage={page}
              closeModalFn={() => dispatch(closeArticlesModal())}
            />
          </Modal>
        </CSSTransition>
        {/* <Pagination pagesCount={page} setPage={setPage} /> */}
      </section>
    </MainTemplate>
  );
};

export default ArticlesView;
