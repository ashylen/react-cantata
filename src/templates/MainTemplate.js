import React from 'react';

import PropTypes from 'prop-types';

import Header from '../components/complex/Header/Header';
import Footer from '../components/complex/Footer/Footer';

const MainTemplate = ({ children, isHomePage }) => (
  <React.Fragment>
    <Header isHomePage={isHomePage} />
    {children}
    <Footer />
  </React.Fragment>
);

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
};

export default MainTemplate;
