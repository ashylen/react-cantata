import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { fetchArticle } from '../../actions/articlesActions';

import styles from './ArticleView.module.scss';

// Components
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';
import Preloader from '../../components/simple/Preloader/Preloader';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';

const ArticleView = props => {
  const { article } = useSelector(state => ({ article: state.articles.article }));
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchArticle(params.id));
  }, []);

  return (
    <>
      <Preloader active={!article} />
      <Header />
      <section>
        <article className={styles.container}>
          <div className={styles.articlesWrapper}>
            <SectionTitle textCustomize="gradient">{article && article.title}</SectionTitle>
            <picture className={styles.image}>
              {article && (
                <a
                  href={`${process.env.REACT_APP_API_URL}${article.main_image.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`${process.env.REACT_APP_API_URL}${article.main_image.url}`} />
                </a>
              )}
            </picture>
            <p className={styles.text}>{article && article.content}</p>

            <div className={styles.galleryWrapper}>
              {article &&
                article.gallery_images.map(image => (
                  <picture className={styles.image}>
                    <a
                      href={`${process.env.REACT_APP_API_URL}${image.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={`${process.env.REACT_APP_API_URL}${image.url}`} />
                    </a>
                  </picture>
                ))}
            </div>
          </div>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default ArticleView;
