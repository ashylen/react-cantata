import React from 'react';

// Modules
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Utilities
import store from '../../store/index';
import './index.css';

// Components
import Header from '../../components/complex/Header/Header';
import DiscographyView from '../DiscographyView/DiscographyView';
import ToursView from '../ToursView/ToursView';
import LatterCompositionsView from '../LatterCompositionsView/LatterCompositionsView';

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <section>
          <DiscographyView />
          <ToursView />
          <LatterCompositionsView />
        </section>
      </Provider>
    </BrowserRouter>
  );
};

export default Root;
