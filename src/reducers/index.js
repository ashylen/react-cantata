import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import articlesReducer from './articlesReducer';
import compositionsReducer from './compositionsReducer';
import discographyReducer from './discographyReducer';
import modalReducer from './modalReducer';
import toursReducer from './toursReducer';

const rootReducer = combineReducers({
  articlesReducer,
  compositionsReducer,
  discographyReducer,
  modalReducer,
  toursReducer,
  form: formReducer,
});

export default rootReducer;
