import {
  EDIT_SPECIMENS_SUCCESS,
  FETCH_SPECIMENS_REQUEST,
  FETCH_SPECIMENS_SUCCESS,
} from '../actions/specimensActions';

const initialState = {
  specimens: [],
};

const specimensReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPECIMENS_REQUEST:
      return {
        ...state,
      };

    case FETCH_SPECIMENS_SUCCESS:
      return {
        ...state,
        specimens: [...action.payload],
      };
    case EDIT_SPECIMENS_SUCCESS:
    default:
      return state;
  }
};

export default specimensReducer;
