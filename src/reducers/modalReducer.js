import { OPEN_SPECIMENS_MODAL, CLOSE_SPECIMENS_MODAL } from '../actions/modalActions';

const initialState = {
  specimens: {
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
    default:
      return state;
  }
};

export default modalReducer;
