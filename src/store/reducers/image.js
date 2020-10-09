import { POST_SINGLE_IMAGE } from '../actions';

const initialState = {
    imageProduct: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case POST_SINGLE_IMAGE:
            return {
                ...state,
                imageProduct: actions.data,
            };

        default:
            return state;
    }
};
