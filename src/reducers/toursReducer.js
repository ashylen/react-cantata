import { FETCH_TOURS_REQUEST, FETCH_TOURS_SUCCESS } from '../actions/toursActions';

const initialState = {
  tours:[]
};

const toursReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOURS_REQUEST:
      return {
        ...state,
      };
    case FETCH_TOURS_SUCCESS:
      return {
        ...state,
        tours: [...action.payload.data],
      };
    default:
      return state;
  }
};

export default toursReducer;
