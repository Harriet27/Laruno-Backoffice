import { GET_ORDERS, DETAIL_ORDERS } from '../actions/';

const initialState = {
  getOrders: null,
  detailOrders: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ORDERS:
      return {
        ...state,
        getOrders: actions.data,
      };
    case DETAIL_ORDERS:
      return {
        ...state,
        detailOrders: actions.data,
      };
    default:
      return state;
  }
};
