import axios from 'axios';

import { history } from '../store';

import { axiosAuthorized } from '../helpers/auth/interceptors';

export const FETCH_USER = 'FETCH_USER';
export const LOGOUT = 'LOGOUT';

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
    sessionStorage.setItem('token', response.data.jwt);
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT });
    sessionStorage.removeItem('token');
    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserByToken = () => async dispatch => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return;
  }

  try {
    const response = await axiosAuthorized({
      method: 'GET',
      url: `/users/me`,
    });

    dispatch({ type: FETCH_USER, payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

export const getAccessToken = () => dispatch => {
  return new Promise((resolve, reject) => {
    let token = sessionStorage.getItem('token');
    if (token) {
      // let tokenExpiresDate = jwt_decode(token).exp;
      // let currentDate = Math.round(new Date().getTime() / 1000);

      resolve(token);
    } else {
      reject('403');
    }
  });
};
