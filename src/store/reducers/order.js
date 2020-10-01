import { GET_ORDERS, SHOW_ORDERS } from '../actions/';

const initialState = {
    getOrders: null,
    showOrders: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ORDERS:
            return {
                ...state,
                getOrders: actions.data,
            };
        case SHOW_ORDERS:
            return {
                ...state,
                showOrders: actions.data,
            };
        default:
            return state;
    }
};
