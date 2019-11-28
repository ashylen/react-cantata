import axios from 'axios';

export const OPEN_COMPOSITIONS_MODAL = 'OPEN_COMPOSITIONS_MODAL';
export const OPEN_COMPOSITIONS_MODAL_FAILURE = 'OPEN_COMPOSITIONS_MODAL_FAILURE';
export const CLOSE_COMPOSITIONS_MODAL = 'CLOSE_COMPOSITIONS_MODAL';

export const FETCH_COMPOSITIONS_ITEM_REQUEST = 'FETCH_COMPOSITIONS_ITEM_REQUEST';
export const FETCH_COMPOSITIONS_ITEM_SUCCESS = 'FETCH_COMPOSITIONS_ITEM_SUCCESS';
export const FETCH_COMPOSITIONS_ITEM_FAILURE = 'FETCH_COMPOSITIONS_ITEM_FAILURE';

export const openCompositionsModal = (isEditMode, idCurrentItem) => dispatch => {
  if (idCurrentItem === null || !idCurrentItem) {
    dispatch({
      type: OPEN_COMPOSITIONS_MODAL,
      compositions: {
        isModalOpen: true,
        isEditMode: false,
        idCurrentItem: null,
        editItemData: {},
      },
    });
  } else {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/compositions/${idCurrentItem}`)
      .then(({ data }) => {
        dispatch({
          type: OPEN_COMPOSITIONS_MODAL,
          compositions: {
            isModalOpen: true,
            isEditMode,
            idCurrentItem,
            editItemData: data,
          },
        });
      })
      .catch(err => {
        console.error(err); // Dodać obsługe
        // OPEN_COMPOSITIONS_MODAL_FAILURE
      });
  }
};

export const closeCompositionsModal = () => dispatch => {
  dispatch({
    type: CLOSE_COMPOSITIONS_MODAL,
  });
};
