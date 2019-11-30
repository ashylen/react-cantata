import { FETCH_ARTICLES, FETCH_ARTICLE } from '../actions/articlesActions';

const initialState = {
  articles: [],
  article: null,
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: [...action.payload],
      };
    case FETCH_ARTICLE:
      return {
        ...state,
        article: action.payload,
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

export default articlesReducer;
