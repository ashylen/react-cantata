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
        articles: action.payload,
        article: null,
      };
    case FETCH_ARTICLE:
      return {
        ...state,
        articles: [],
        article: action.payload,
      };
    default:
      return state;
  }
};

export default articlesReducer;
