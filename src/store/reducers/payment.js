import { GET_PAYMENTS_METHOD } from '../actions';

const initialState = {
    getPaymentsMethod: null,
    show: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_PAYMENTS_METHOD:
            return {
                ...state,
                getPaymentsMethod: actions.data,
            };
        default:
            return state;
    }
};
