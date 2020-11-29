import { GET_PAYMENTS_METHOD, GET_LIST_PAYMENTS_METHOD } from '../actions';

const initialState = {
  getPaymentsMethod: null,
  getListPaymentsMethod: null,
  show: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_PAYMENTS_METHOD:
      return {
        ...state,
        getPaymentsMethod: actions.data,
      };
    case GET_LIST_PAYMENTS_METHOD:
      return {
        ...state,
        getListPaymentsMethod: actions.data,
      };
    default:
      return state;
  }
};
