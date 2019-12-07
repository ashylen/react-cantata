import { FETCH_DICTIONARY, FETCH_DICTIONARY_ITEM } from '../actions/dictionaryActions';

const initialState = {
  dictionary: [],
  dictionaryItem: {},
};

const dictionaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DICTIONARY:
      return {
        ...state,
        dictionary: action.payload,
      };
    case FETCH_DICTIONARY_ITEM:
      return {
        ...state,
        dictionaryItem: action.payload,
      };
    default:
      return state;
  }
};

export default dictionaryReducer;
