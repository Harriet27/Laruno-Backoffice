import { GET_PRODUCT, SHOW_PRODUCT } from '../actions';

const initialState = {
    getProduct: null,
    showProduct: null,
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
        default:
            return state;
    }
};
