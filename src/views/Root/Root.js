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

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          {/* <Route exact path={routes.login} component={LoginPage} /> */}
          {/* <Route exact path={routes.home} render={() => <Redirect to="/notes" />} /> */}
          <Route exact path={routes.home} component={HomePageView} />
          <Route exact path={routes.articles} component={ArticlesView} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default Root;
