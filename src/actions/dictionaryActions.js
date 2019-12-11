import axios from 'axios';
import { axiosAuthorized } from '../helpers/auth/interceptors';

export const FETCH_DICTIONARY = 'FETCH_DICTIONARY';
export const FETCH_DICTIONARY_ITEM = 'FETCH_DICTIONARY_ITEM';

export const fetchDictionaryItem = id => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dictionaries/${id}`);
    dispatch({
      type: FETCH_DICTIONARY_ITEM,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const fetchDictionary = (sortColumn, sortDirection, limit, page = 1) => async dispatch => {
  try {
    const responseCount = await axios.get(`${process.env.REACT_APP_API_URL}/dictionaries/count`);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dictionaries`, {
      params: {
        _sort:
          sortColumn && sortDirection
            ? `${sortColumn}:${sortDirection.toUpperCase()}`
            : 'keyword:ASC',
        _limit: limit && limit * page,
      },
    });

    dispatch({
      type: FETCH_DICTIONARY,
      payload: {
        data: response.data,
        count: responseCount.data,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const addDictionary = data => async () => {
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

    await axiosAuthorized({
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

export const deleteDictionary = id => async () => {
  try {
    await axiosAuthorized({
      method: 'DELETE',
      url: `/dictionaries/${id}`,
    });
  } catch (error) {
    throw error;
  }
};
