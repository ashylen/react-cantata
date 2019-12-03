import axios from 'axios';
import { axiosAuthInstance } from '../helpers/auth/interceptors';

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

export const addArticle = data => async dispatch => {
  let formData = new FormData();
  formData.append('files', data.image);
  let file;
  try {
    if (!!data.image) {
      file = await axiosAuthInstance({
        method: 'POST',
        url: `/upload`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });
    }

    const response = await axiosAuthInstance({
      method: 'POST',
      url: `/articles`,
      data: { ...data, image: file && file.data },
    });
  } catch (error) {
    console.error(error);
    // dispatch({ type: ADD_articleS_FAILURE });
  }
};

export const deleteArticle = id => async dispatch => {
  try {
    const response = await axiosAuthInstance({
      method: 'DELETE',
      url: `/articles/${id}`,
    });
  } catch (error) {
    console.error(error);
  }
};
