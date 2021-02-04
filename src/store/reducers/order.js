import { GET_ORDERS, DETAIL_ORDERS, DETAIL_PAYMENT } from '../actions/';

const initialState = {
  getOrders: null,
  detailOrders: null,
  detailPayment: null,
  successDetailPayment: false,
  successGetOrder: false,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_ORDERS:
      return {
        ...state,
        getOrders: actions.data,
        successGetOrder: true,
      };
    case DETAIL_ORDERS:
      return {
        ...state,
        detailOrders: actions.data,
        success: true,
      };
    case DETAIL_PAYMENT:
      return {
        ...state,
        detailPayment: actions.data,
        successDetailPayment: true
      }
    default:
      return state;
  }
};
