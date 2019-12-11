import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { fetchUserByToken } from '../actions/usersActions';

import Header from '../components/complex/Header/Header';
import Footer from '../components/complex/Footer/Footer';

const MainTemplate = ({ children, isHomePage }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserByToken());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header isHomePage={isHomePage} />
      {children}
      <Footer />
    </React.Fragment>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default MainTemplate;
