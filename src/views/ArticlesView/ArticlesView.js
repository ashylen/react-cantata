import React, { useEffect } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';

// Utils
import { fetchArticles } from '../../actions/articlesActions';
import styles from './ArticlesView.module.scss';

// Components
import Tile from '../../components/complex/Tile/Tile';
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';
import Preloader from '../../components/simple/Preloader/Preloader';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';

const ArticlesView = () => {
  const { articles } = useSelector(state => ({ articles: state.articles.articles }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <>
      <Preloader active={!articles || !articles.length > 0} />
      <Header />
      <section>
        <article className={styles.container}>
          <SectionTitle textCustomize="gradient">Artykuły</SectionTitle>
          <div className={styles.articlesWrapper}>
            {!!articles &&
              articles.map(article => <Tile routeName="article" key={article.id} data={article} />)}
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default ArticlesView;
