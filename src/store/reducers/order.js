import { GET_ORDERS, DETAIL_ORDERS, DETAIL_PAYMENT, DETAIL_TRANSFER_CONFIRM } from '../actions/';

const initialState = {
  getOrders: null,
  detailOrders: null,
  detailPayment: null,
  detailTransferConfirm: null,
  successDetailPayment: false,
  successGetOrder: false,
  successDetailTransferConfirm: false
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
    case DETAIL_TRANSFER_CONFIRM:
      return {
        ...state,
        detailTransferConfirm: actions.data,
        successDetailTransferConfirm: true
      }
    default:
      return state;
  }
};
