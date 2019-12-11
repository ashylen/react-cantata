import axios from 'axios';

import store, { history } from '../../store';
import { routes } from '../../routes';
import { getAccessToken } from '../../actions/usersActions';

const useToken = config => {
  return store
    .dispatch(getAccessToken())
    .then(token => {
      config.headers.Authorization = `Bearer ${token}`;
      return Promise.resolve(config);
    })
    .catch(() => {
      return Promise.resolve(config);
    });
};

const axiosNonAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const axiosAuthorized = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosAuthorized.interceptors.request.use(useToken, error => {
  return Promise.reject(error);
});

axiosAuthorized.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 403 || error.response.status === 401) {
        history.push(routes.home);
      }

      if (error.response.status === 400) {
        if (error.response.data.message) {
          throw error;
        }

        return Promise.reject(null);
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export { axiosNonAuthInstance, axiosAuthorized };
