import { GET_COUPONS, SHOW_COUPONS } from '../actions';

const initialState = {
  getCoupons: null,
  showCoupons: {},
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_COUPONS:
      return {
        ...state,
        getCoupons: actions.data,
      };
    case SHOW_COUPONS:
      return {
        ...state,
        showCoupons: actions.data,
      };
    default:
      return state;
  }
};
