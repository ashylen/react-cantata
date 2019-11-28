import { OPEN_COMPOSITIONS_MODAL, CLOSE_COMPOSITIONS_MODAL } from '../actions/modalActions';

const initialState = {
  compositions: {
    isModalOpen: false,
    isEditMode: false,
    idCurrentItem: null,
    editItemData: {},
  },
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_COMPOSITIONS_MODAL:
      return {
        ...state,
        compositions: {
          isModalOpen: action.compositions.isModalOpen,
          isEditMode: action.compositions.isEditMode,
          idCurrentItem: action.compositions.idCurrentItem,
          editItemData: action.compositions.editItemData,
        },
      };
    case CLOSE_COMPOSITIONS_MODAL:
      return {
        ...state,
        compositions: {
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
