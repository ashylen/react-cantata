import { FETCH_USER, LOGOUT } from '../actions/usersActions';

const initialState = {
  user: {},
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default usersReducer;
