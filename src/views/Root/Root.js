import React from 'react';

// Modules
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Utilities
import store from '../../store';
import { routes } from '../../routes';
import './index.css';

// Components
import HomePageView from '../HomePageView/HomePageView';
import ArticlesView from '../ArticlesView/ArticlesView';
import ArticleView from '../ArticleView/ArticleView';
import TripsView from '../TripsView/TripsView';
import LoginView from '../LoginView/LoginView';
// import TripView from '../TripView/TripView';

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          {/* <Route exact path={routes.login} component={LoginPage} /> */}
          <Route exact path={routes.home} component={HomePageView} />
          <Route exact path={routes.articles} component={ArticlesView} />
          <Route exact path={routes.article(':id')} component={ArticleView} />
          <Route exact path={routes.trips} component={TripsView} />
          <Route exact path={routes.login} component={LoginView} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default Root;
