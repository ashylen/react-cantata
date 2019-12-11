import axios from 'axios';
import { axiosAuthorized } from '../helpers/auth/interceptors';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const FETCH_ARTICLE = 'FETCH_ARTICLE';

export const fetchArticles = (limit, page = 1) => async dispatch => {
  try {
    const responseCount = await axios.get(`${process.env.REACT_APP_API_URL}/articles/count`);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles`, {
      params: {
        _limit: limit && limit * page,
        _sort: 'created_at:DESC',
      },
    });

    dispatch({
      type: FETCH_ARTICLES,
      payload: {
        data: response.data,
        count: responseCount.data,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const fetchArticle = id => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/articles/${id}`);
    dispatch({
      type: FETCH_ARTICLE,
      payload: response.data,
    });
  } catch (error) {
    throw error;
  }
};

export const addArticle = data => async () => {
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
      url: `/articles`,
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

export const deleteArticle = id => async () => {
  try {
    await axiosAuthorized({
      method: 'DELETE',
      url: `/articles/${id}`,
    });
  } catch (error) {
    throw error;
  }
};
