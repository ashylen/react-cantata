import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import articlesReducer from './articlesReducer';
import compositionsReducer from './compositionsReducer';
import discographyReducer from './discographyReducer';
import modalReducer from './modalReducer';
import tripsReducer from './tripsReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  articlesReducer,
  compositionsReducer,
  discographyReducer,
  modalReducer,
  tripsReducer,
  usersReducer,
  form: formReducer,
});

export default rootReducer;
