import { GET_PRODUCT, SHOW_PRODUCT, GET_LIST_PRODUCT } from '../actions';

const initialState = {
  getProduct: null,
  showProduct: null,
  getListProduct: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_PRODUCT:
      return {
        ...state,
        getProduct: actions.data,
      };
    case SHOW_PRODUCT:
      return {
        ...state,
        showProduct: actions.data,
      };
    case GET_LIST_PRODUCT:
      return {
        ...state,
        getListProduct: actions.data,
      };
    default:
      return state;
  }
};
