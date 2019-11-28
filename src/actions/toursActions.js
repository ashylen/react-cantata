import axios from 'axios';

export const FETCH_TOURS_REQUEST = 'FETCH_TOURS_REQUEST';
export const FETCH_TOURS_SUCCESS = 'FETCH_TOURS_SUCCESS';
export const FETCH_TOURS_FAILURE = 'FETCH_TOURS_FAILURE';

export const fetchTours = () => dispatch => {
  dispatch({ type: FETCH_TOURS_REQUEST });

  return axios
    .get(`${process.env.REACT_APP_API_URL}/tours`)
    .then(({ data }) => {
      dispatch({
        type: FETCH_TOURS_SUCCESS,
        payload: {
          data
        },
      });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: FETCH_TOURS_FAILURE });
    });
};
