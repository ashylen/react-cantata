import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';

export const login = (identifier, password) => async dispatch => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/local`, {
      identifier,
      password,
    });

    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
