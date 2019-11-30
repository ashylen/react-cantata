import { FETCH_TRIPS, FETCH_TRIP } from '../actions/tripsActions';

const initialState = {
  trips: [],
  trip: null,
};

const tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRIPS:
      return {
        ...state,
        trips: [...action.payload],
      };
    case FETCH_TRIP:
      return {
        ...state,
        trip: action.payload,
      };
    //   case ADD_COMPOSITIONS_SUCCESS:
    //     return {
    //       ...state,
    //       compositions: [...state.compositions, action.payload.data],
    //     };
    //   case EDIT_COMPOSITIONS_SUCCESS:
    default:
      return state;
  }
};

export default tripsReducer;
