import axios from 'axios';
import { axiosAuthInstance } from '../helpers/auth/interceptors';

export const FETCH_DICTIONARY = 'FETCH_DICTIONARY';

export const fetchDictionary = id => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dictionaries`);
    dispatch({
      type: FETCH_DICTIONARY,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addDictionary = data => async dispatch => {
  let formDataImage = new FormData();
  let formDataGalleryImages = new FormData();
  data.image && formDataImage.append('files', data.image[0]);
  data.gallery_images &&
    data.gallery_images.forEach(image => formDataGalleryImages.append('files', image));

  let image;
  let galleryImages;
  try {
    if (!!data.image) {
      image = await axiosAuthInstance({
        method: 'POST',
        url: `/upload`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formDataImage,
      });
    }

    if (!!data.gallery_images) {
      galleryImages = await axiosAuthInstance({
        method: 'POST',
        url: `/upload`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formDataGalleryImages,
      });
    }
    // return;
    const response = await axiosAuthInstance({
      method: 'POST',
      url: `/dictionaries`,
      data: {
        ...data,
        image: image && image.data,
        gallery_images: galleryImages && galleryImages.data,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const deleteDictionary = id => async dispatch => {
  try {
    const response = await axiosAuthInstance({
      method: 'DELETE',
      url: `/dictionaries/${id}`,
    });
  } catch (error) {
    throw error;
  }
};
