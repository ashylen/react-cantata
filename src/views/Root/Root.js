import React from 'react';

// Modules
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import 'typeface-montserrat';

// Utilities
import store, { history } from '../../store';
import { routes } from '../../routes';
import './index.css';

// Components
import HomePageView from '../HomePageView/HomePageView';
import ArticlesView from '../ArticlesView/ArticlesView';
import ArticleView from '../ArticleView/ArticleView';
import TripsView from '../TripsView/TripsView';
import TripView from '../TripView/TripView';
import LoginView from '../LoginView/LoginView';
import DictionaryView from '../DictionaryView/DictionaryView';
import ScrollTop from '../../hoc/ScrollTop';
// TO DO:
// słownik
// button wylogowania
// refractor
// Snackbary do akcji
// przerobic wszystkie requesty na try catch i uzeby uzywaly axiosauth/nonauth
// Paginacja artykułów
const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollTop>
          <Switch>
            <Route exact path={routes.home} component={HomePageView} />
            <Route exact path={routes.articles} component={ArticlesView} />
            <Route exact path={routes.article(':id')} component={ArticleView} />
            <Route exact path={routes.trips} component={TripsView} />
            <Route exact path={routes.trip(':id')} component={TripView} />
            <Route exact path={routes.login} component={LoginView} />
            <Route exact path={routes.dictionary} component={DictionaryView} />
          </Switch>
        </ScrollTop>
      </ConnectedRouter>
    </Provider>
  );
};

export default Root;
