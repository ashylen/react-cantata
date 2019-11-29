import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchArticles } from '../../actions/articlesActions';

import ArticleBox from '../../components/complex/ArticleBox/ArticleBox';

import styles from './ArticlesView.module.scss';

// Components
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';

const ArticlesView = () => {
  // const articles = useSelector();
  const { articles } = useSelector(state => ({ articles: state.articlesReducer.articles }));
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
            {!!articles && articles.map(article => <ArticleBox key={article.id} data={article} />)}
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default ArticlesView;
