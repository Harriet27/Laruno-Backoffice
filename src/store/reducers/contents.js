import { GET_FULFILLMENTS, SHOW_FULFILLMENTS } from '../actions';

const initialState = {
    getFulFillments: null,
    showFulFillments: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_FULFILLMENTS:
            return {
                ...state,
                getFulFillments: actions.data,
            };
        case SHOW_FULFILLMENTS:
            return {
                ...state,
                showFulFillments: actions.data,
            };
        default:
            return state;
    }
};
