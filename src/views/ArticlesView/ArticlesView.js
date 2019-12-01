import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchArticles } from '../../actions/articlesActions';

import Tile from '../../components/complex/Tile/Tile';

import styles from './ArticlesView.module.scss';

// Components
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';

const ArticlesView = () => {
  const { articles } = useSelector(state => ({ articles: state.articles.articles }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <>
      <Header />
      <section>
        {console.log(articles)}
        <article className={styles.container}>
          <h1>Artykuły</h1>
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
