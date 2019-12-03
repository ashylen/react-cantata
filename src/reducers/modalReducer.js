import {
  OPEN_SPECIMENS_MODAL,
  CLOSE_SPECIMENS_MODAL,
  OPEN_ARTICLES_MODAL,
  CLOSE_ARTICLES_MODAL,
  OPEN_TRIPS_MODAL,
  CLOSE_TRIPS_MODAL,
} from '../actions/modalActions';

const initialState = {
  specimens: {
    isModalOpen: false,
    isEditMode: false,
    idCurrentItem: null,
    editItemData: {},
  },
  articles: {
    isModalOpen: false,
    isEditMode: false,
    idCurrentItem: null,
    editItemData: {},
  },
  trips: {
    isModalOpen: false,
    isEditMode: false,
    idCurrentItem: null,
    editItemData: {},
  },
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_SPECIMENS_MODAL:
      return {
        ...state,
        specimens: {
          isModalOpen: action.specimens.isModalOpen,
          isEditMode: action.specimens.isEditMode,
          idCurrentItem: action.specimens.idCurrentItem,
          editItemData: action.specimens.editItemData,
        },
      };
    case CLOSE_SPECIMENS_MODAL:
      return {
        ...state,
        specimens: {
          isModalOpen: false,
          isEditMode: false,
          idCurrentItem: null,
          editItemData: {},
        },
      };
    case OPEN_ARTICLES_MODAL:
      return {
        ...state,
        articles: {
          isModalOpen: action.articles.isModalOpen,
          isEditMode: action.articles.isEditMode,
          idCurrentItem: action.articles.idCurrentItem,
          editItemData: action.articles.editItemData,
        },
      };
    case CLOSE_ARTICLES_MODAL:
      return {
        ...state,
        articles: {
          isModalOpen: false,
          isEditMode: false,
          idCurrentItem: null,
          editItemData: {},
        },
      };
    case OPEN_TRIPS_MODAL:
      return {
        ...state,
        trips: {
          isModalOpen: action.trips.isModalOpen,
          isEditMode: action.trips.isEditMode,
          idCurrentItem: action.trips.idCurrentItem,
          editItemData: action.trips.editItemData,
        },
      };
    case CLOSE_TRIPS_MODAL:
      return {
        ...state,
        trips: {
          isModalOpen: false,
          isEditMode: false,
          idCurrentItem: null,
          editItemData: {},
        },
      };
    default:
      return state;
  }
};

export default modalReducer;
