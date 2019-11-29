import axios from 'axios';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';

export const fetchArticles = () => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles`);
    console.log(response);
    dispatch({
      type: FETCH_ARTICLES,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
