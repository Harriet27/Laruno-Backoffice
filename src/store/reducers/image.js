import { POST_SINGLE_IMAGE, POST_MULTIPLE_IMAGE } from '../actions';

const initialState = {
    imageProduct: null,
    imageProductMultiple: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case POST_SINGLE_IMAGE:
            return {
                ...state,
                imageProduct: actions.data,
            };
        case POST_MULTIPLE_IMAGE:
            return {
                ...state,
                imageProductMultiple: actions.data,
            };
        default:
            return state;
    }
};
