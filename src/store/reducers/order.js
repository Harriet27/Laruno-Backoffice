import { GET_ORDERS, DETAIL_ORDERS } from '../actions/';

const initialState = {
  getOrders: null,
  detailOrders: null,
  success: false,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ORDERS:
      return {
        ...state,
        getOrders: actions.data,
        success: true,
      };
    case DETAIL_ORDERS:
      return {
        ...state,
        detailOrders: actions.data,
        success: true,
      };
    default:
      return state;
  }
};
