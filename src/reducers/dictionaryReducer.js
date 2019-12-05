import { FETCH_DICTIONARY } from '../actions/dictionaryActions';

const initialState = {
  dictionary: [],
};

const dictionaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DICTIONARY:
      return {
        ...state,
        dictionary: action.payload,
      };
    default:
      return state;
  }
};

export default dictionaryReducer;
