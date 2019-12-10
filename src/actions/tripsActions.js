import axios from 'axios';
import { axiosAuthorized } from '../helpers/auth/interceptors';

export const FETCH_TRIPS = 'FETCH_TRIPS';
export const FETCH_TRIP = 'FETCH_TRIP';

export const fetchTrips = (limit, page = 1) => async dispatch => {
  try {
    const responseCount = await axios.get(`${process.env.REACT_APP_API_URL}/trips/count`);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/trips`, {
      params: {
        _limit: limit && limit * page,
        _sort: 'created_at:DESC',
      },
    });
    dispatch({
      type: FETCH_TRIPS,
      payload: {
        data: response.data,
        count: responseCount.data,
      },
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

export const addTrip = data => async dispatch => {
  let formDataImage = new FormData();
  let formDataGalleryImages = new FormData();
  data.image && formDataImage.append('files', data.image[0]);
  data.gallery_images &&
    data.gallery_images.forEach(image => formDataGalleryImages.append('files', image));

  let image;
  let galleryImages;
  try {
    if (!!data.image) {
      image = await axiosAuthorized({
        method: 'POST',
        url: `/upload`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formDataImage,
      });
    }

    if (!!data.gallery_images) {
      galleryImages = await axiosAuthorized({
        method: 'POST',
        url: `/upload`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formDataGalleryImages,
      });
    }
    // return;
    const response = await axiosAuthorized({
      method: 'POST',
      url: `/trips`,
      data: {
        ...data,
        image: image && image.data,
        gallery_images: galleryImages && galleryImages.data,
      },
    });
  } catch (error) {
    console.error(error);
    // dispatch({ type: ADD_articleS_FAILURE });
  }
};

export const deleteTrip = id => async dispatch => {
  try {
    const response = await axiosAuthorized({
      method: 'DELETE',
      url: `/trips/${id}`,
    });
  } catch (error) {
    console.error(error);
  }
};
