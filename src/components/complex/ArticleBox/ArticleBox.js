import React from 'react';

import PropTypes from 'prop-types';

import styles from './ArticleBox.module.scss';

const ArticleBox = ({ data }) => {
  return (
    <article className={styles.article}>
      {data.main_image && (
        <div className={styles.image}>
          <img src={`${process.env.REACT_APP_API_URL}${data.main_image.url}`} />
          {/* <Img fluid={data.main_image.childImageSharp.fluid} alt={data.title} /> */}
        </div>
      )}
      <div className={styles.bottom}>
        <h2>{data.title}</h2>
        <p>{data.short_description}</p>
      </div>
      {/* <Link className={styles.absoluteLink} to={`/artykuly/${data.id}`} /> */}
    </article>
  );
};

ArticleBox.propTypes = {
  siteTitle: PropTypes.string,
};

ArticleBox.defaultProps = {
  siteTitle: ``,
};

export default ArticleBox;
