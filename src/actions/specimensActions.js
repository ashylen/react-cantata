import axios from 'axios';
import { axiosAuthInstance } from '../helpers/auth/interceptors';

export const ADD_SPECIMENS_REQUEST = 'ADD_SPECIMENS_REQUEST';
export const ADD_SPECIMENS_SUCCESS = 'ADD_SPECIMENS_SUCCESS';
export const ADD_SPECIMENS_FAILURE = 'ADD_SPECIMENS_FAILURE';

export const EDIT_SPECIMENS_REQUEST = 'EDIT_SPECIMENS_REQUEST';
export const EDIT_SPECIMENS_SUCCESS = 'EDIT_SPECIMENS_SUCCESS';
export const EDIT_SPECIMENS_FAILURE = 'EDIT_SPECIMENS_FAILURE';

export const FETCH_SPECIMENS_REQUEST = 'FETCH_SPECIMENS_REQUEST';
export const FETCH_SPECIMENS_SUCCESS = 'FETCH_SPECIMENS_SUCCESS';
export const FETCH_SPECIMENS_FAILURE = 'FETCH_SPECIMENS_FAILURE';

export const fetchSpecimens = () => async dispatch => {
  dispatch({ type: FETCH_SPECIMENS_REQUEST });

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/specimen`);
    dispatch({
      type: FETCH_SPECIMENS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_SPECIMENS_FAILURE });
  }
};

export const addSpecimen = itemContent => async dispatch => {
  dispatch({ type: ADD_SPECIMENS_REQUEST });

  let formData = new FormData();
  formData.append('files', itemContent.image);
  let file;
  try {
    if (!!itemContent.image) {
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
      url: `/specimen`,
      data: { ...itemContent, image: file && file.data },
    });
  } catch (error) {
    console.error(error);
    dispatch({ type: ADD_SPECIMENS_FAILURE });
  }
};

export const deleteSpecimen = id => async dispatch => {
  try {
    const response = await axiosAuthInstance({
      method: 'DELETE',
      url: `/specimen/${id}`,
    });
  } catch (error) {
    console.error(error);
  }
};

export const editSpecimen = (itemId, itemContent) => dispatch => {
  dispatch({ type: EDIT_SPECIMENS_REQUEST });

  return axios
    .put(`${process.env.REACT_APP_API_URL}/specimen/${itemId}`, {
      ...itemContent,
    })
    .then(({ data }) => {
      dispatch({
        type: EDIT_SPECIMENS_SUCCESS,
        payload: {
          data,
          itemId,
        },
      });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: EDIT_SPECIMENS_FAILURE });
    });
};
