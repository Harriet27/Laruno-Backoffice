import { GET_RESELLER, SHOW_RESELLER } from '../actions';

const initialState = {
  getReseller: null,
  showReseller: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_RESELLER:
      return {
        ...state,
        getReseller: actions.data,
      };
    case SHOW_RESELLER:
      return {
        ...state,
        showReseller: actions.data,
      };
    default:
      return state;
  }
};
