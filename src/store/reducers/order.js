import { GET_ORDER } from '../actions';

const initialState = {
    getOrder: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ORDER:
            return {
                ...state,
                getProduct: actions.data,
            };
        default:
            return state;
    }
};
