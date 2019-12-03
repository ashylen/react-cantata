import React, { useEffect, useState } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

// Utils
import { routes } from '../../routes';
import { fetchArticle } from '../../actions/articlesActions';
import styles from './ArticleView.module.scss';

// Components
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';

const ArticleView = props => {
  const { article } = useSelector(state => ({ article: state.articles.article }));
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchArticle(params.id));
      setIsFetching(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Preloader active={isFetching} />
      <Header />
      <section>
        <article className={styles.container}>
          <div className={styles.articlesWrapper}>
            <SectionTitle textCustomize="gradient">{article && article.title}</SectionTitle>
            {/* <picture className={styles.image}>
              {article && (
                <a
                  href={`${process.env.REACT_APP_API_URL}${article.image.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`${process.env.REACT_APP_API_URL}${article.image.url}`} />
                </a>
              )}
            </picture> */}
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
          <br />
          <Link className={styles.absoluteLink} to={routes.articles}>
            <Button type="button">Powrót</Button>
          </Link>
        </article>
      </section>
      <Footer />
    </>
  );
};

export default ArticleView;
