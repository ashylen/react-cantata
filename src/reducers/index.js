import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import articles from './articlesReducer';
import specimens from './specimensReducer';
import modals from './modalReducer';
import trips from './tripsReducer';
import users from './usersReducer';

const rootReducer = history =>
  combineReducers({
    articles,
    specimens,
    modals,
    trips,
    users,
    form: formReducer,
    router: connectRouter(history),
  });

export default rootReducer;
