import axios from 'axios';

import { history } from '../store';

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
    localStorage.setItem('user', response.data.jwt);
    history.push('/');
  } catch (error) {
    // TO DO Tutaj zrobić jakiś error handling
    console.error(error);
  }
};
