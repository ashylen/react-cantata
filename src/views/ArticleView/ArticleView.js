import React, { useEffect, useState } from 'react';

// Modules
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

// Utils
import { routes } from '../../routes';
import { fetchArticle } from '../../actions/articlesActions';
import { fetchDictionary } from '../../actions/dictionaryActions';
import styles from './ArticleView.module.scss';

// Components
import Header from '../../components/complex/Header/Header';
import Footer from '../../components/complex/Footer/Footer';
import Preloader from '../../components/simple/Preloader/Preloader';
import Button from '../../components/simple/Button/Button';
import SectionTitle from '../../components/complex/SectionTitle/SectionTitle';

const ArticleView = props => {
  const { article } = useSelector(state => ({ article: state.articles.article }));
  const { dictionary } = useSelector(state => ({ dictionary: state.dictionary.dictionary.data }));
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchArticle(params.id));
      await dispatch(fetchDictionary());
      setIsFetching(false);
    };

    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const checkForKeywords = text => {
    let formattedText = text;

    if (dictionary && dictionary.length > 0) {
      dictionary.map(item => {
        formattedText = reactStringReplace(formattedText, item.keyword, (match, i) => (
          <Link
            key={i}
            className={styles.dictionaryLink}
            title={item.hover_text}
            to={routes.dictionaryItem(item.id)}
          >
            {item.keyword}
          </Link>
        ));

        return formattedText;
      });
      return formattedText;
    } else {
      return formattedText;
    }
  };

  return (
    <>
      <Preloader active={isFetching} />
      <Header />
      <section>
        <article className={styles.container}>
          <div className={styles.articlesWrapper}>
            <SectionTitle textCustomize="gradient">{article && article.title}</SectionTitle>
            <div className={styles.text}>{article && checkForKeywords(article.content)}</div>
            <br />
            <br />
            <div className={styles.galleryWrapper}>
              {article &&
                article.gallery_images.map(image => (
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
          <br />
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
