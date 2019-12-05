import axios from 'axios';

export const OPEN_SPECIMENS_MODAL = 'OPEN_SPECIMENS_MODAL';
export const OPEN_SPECIMENS_MODAL_FAILURE = 'OPEN_SPECIMENS_MODAL_FAILURE';
export const CLOSE_SPECIMENS_MODAL = 'CLOSE_SPECIMENS_MODAL';

export const OPEN_ARTICLES_MODAL = 'OPEN_ARTICLES_MODAL';
export const OPEN_ARTICLES_MODAL_FAILURE = 'OPEN_ARTICLES_MODAL_FAILURE';
export const CLOSE_ARTICLES_MODAL = 'CLOSE_ARTICLES_MODAL';

export const OPEN_TRIPS_MODAL = 'OPEN_TRIPS_MODAL';
export const OPEN_TRIPS_MODAL_FAILURE = 'OPEN_TRIPS_MODAL_FAILURE';
export const CLOSE_TRIPS_MODAL = 'CLOSE_TRIPS_MODAL';

export const OPEN_DICTIONARY_MODAL = 'OPEN_DICTIONARY_MODAL';
export const CLOSE_DICTIONARY_MODAL = 'CLOSE_DICTIONARY_MODAL';

export const FETCH_SPECIMENS_ITEM_REQUEST = 'FETCH_SPECIMENS_ITEM_REQUEST';
export const FETCH_SPECIMENS_ITEM_SUCCESS = 'FETCH_SPECIMENS_ITEM_SUCCESS';
export const FETCH_SPECIMENS_ITEM_FAILURE = 'FETCH_SPECIMENS_ITEM_FAILURE';

export const openSpecimensModal = (isEditMode, idCurrentItem) => dispatch => {
  if (idCurrentItem === null || !idCurrentItem) {
    dispatch({
      type: OPEN_SPECIMENS_MODAL,
      specimens: {
        isModalOpen: true,
        isEditMode: false,
        idCurrentItem: null,
        editItemData: {},
      },
    });
  } else {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/specimen/${idCurrentItem}`)
      .then(({ data }) => {
        dispatch({
          type: OPEN_SPECIMENS_MODAL,
          specimens: {
            isModalOpen: true,
            isEditMode,
            idCurrentItem,
            editItemData: data,
          },
        });
      })
      .catch(err => {
        console.error(err); // Dodać obsługe
        // OPEN_SPECIMENS_MODAL_FAILURE
      });
  }
};

export const closeSpecimensModal = () => dispatch => {
  dispatch({
    type: CLOSE_SPECIMENS_MODAL,
  });
};

export const openArticlesModal = () => dispatch => {
  dispatch({
    type: OPEN_ARTICLES_MODAL,
    articles: {
      isModalOpen: true,
      isEditMode: false,
      idCurrentItem: null,
      editItemData: {},
    },
  });
};

export const closeArticlesModal = () => dispatch => {
  dispatch({
    type: CLOSE_ARTICLES_MODAL,
  });
};

export const openTripsModal = () => dispatch => {
  dispatch({
    type: OPEN_TRIPS_MODAL,
    trips: {
      isModalOpen: true,
      isEditMode: false,
      idCurrentItem: null,
      editItemData: {},
    },
  });
};

export const closeTripsModal = () => dispatch => {
  dispatch({
    type: CLOSE_TRIPS_MODAL,
  });
};

export const openDictionaryModal = () => dispatch => {
  dispatch({
    type: OPEN_DICTIONARY_MODAL,
    dictionary: {
      isModalOpen: true,
      isEditMode: false,
      idCurrentItem: null,
      editItemData: {},
    },
  });
};

export const closeDictionaryModal = () => dispatch => {
  dispatch({
    type: CLOSE_DICTIONARY_MODAL,
  });
};
