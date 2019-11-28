import {
  ADD_COMPOSITIONS_SUCCESS,
  EDIT_COMPOSITIONS_SUCCESS,
  FETCH_COMPOSITIONS_REQUEST,
  FETCH_COMPOSITIONS_SUCCESS,
} from '../actions/compositionActions';

const initialState = {
  compositions: [],
};

const compositionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPOSITIONS_REQUEST:
      return {
        ...state,
      };

    case FETCH_COMPOSITIONS_SUCCESS:
      return {
        ...state,
        compositions: [...action.payload.data],
      };
    case ADD_COMPOSITIONS_SUCCESS:
      return {
        ...state,
        compositions: [...state.compositions, action.payload.data],
      };
    case EDIT_COMPOSITIONS_SUCCESS:
    default:
      return state;
  }
};

export default compositionsReducer;
