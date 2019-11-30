import axios from 'axios';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLE = 'FETCH_ARTICLE';

export const fetchArticles = () => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles`);
    dispatch({
      type: FETCH_ARTICLES,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchArticle = id => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/${id}`);
    dispatch({
      type: FETCH_ARTICLE,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
