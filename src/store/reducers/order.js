import { GET_ORDER } from '../actions';

const initialState = {
    getOrders: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ORDER:
            return {
                ...state,
                getOrders: actions.data,
            };
        default:
            return state;
    }
};
