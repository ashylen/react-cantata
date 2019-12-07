import React, { Component } from 'react';
import classNames from 'classnames';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = props => {
  return (
    <div className={styles.pagination}>
      <ReactPaginate
        pageCount={props.pagesCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        // forcePage={props.page - 1}
        onPageChange={page => props.setPage(page.selected + 1)}
        containerClassName="pagination"
        pageClassName={styles.item}
        breakClassName={styles.item}
        activeClassName={styles.active}
        disabledClassName={styles.disabled}
        previousClassName={classNames(styles.item, styles.prev)}
        breakLabel={<span className={styles.item}>...</span>}
        nextClassName={styles.item}
        pageLinkClassName={styles.item}
        previousLabel={'<'}
        nextLabel={'>'}
      />
    </div>
  );
};

export default Pagination;
