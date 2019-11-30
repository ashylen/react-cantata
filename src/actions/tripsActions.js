import axios from 'axios';

export const FETCH_TRIPS = 'FETCH_TRIPS';
export const FETCH_TRIP = 'FETCH_TRIP';

export const fetchTrips = () => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/trips`);
    dispatch({
      type: FETCH_TRIPS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTrip = id => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/trips/${id}`);
    dispatch({
      type: FETCH_TRIP,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};
