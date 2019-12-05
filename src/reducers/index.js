import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import articles from './articlesReducer';
import specimens from './specimensReducer';
import modals from './modalReducer';
import trips from './tripsReducer';
import users from './usersReducer';
import dictionary from './dictionaryReducer';

const rootReducer = history =>
  combineReducers({
    articles,
    dictionary,
    modals,
    specimens,
    trips,
    users,
    form: formReducer,
    router: connectRouter(history),
  });

export default rootReducer;
