import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { routes } from '../../../routes';

import styles from './Tile.module.scss';

const Tile = ({ data, routeName }) => {
  return (
    <article className={styles.article}>
      {data.main_image && (
        <div className={styles.image}>
          <img src={`${process.env.REACT_APP_API_URL}${data.main_image.url}`} />
        </div>
      )}
      <div className={styles.bottom}>
        <h2>{data.title}</h2>
        <p>{data.short_description}</p>
      </div>
      <Link className={styles.absoluteLink} to={routes[routeName](data.id)} />
    </article>
  );
};

Tile.propTypes = {
  siteTitle: PropTypes.string,
};

Tile.defaultProps = {
  siteTitle: ``,
};

export default Tile;
