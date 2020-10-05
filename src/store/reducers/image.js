import { GET_IMAGE, POST_SINGLE_IMAGE, POST_MULTIPLE_IMAGE } from '../actions';

const initialState = {
    getImage: null,
    postSingleImage: null,
    postMultipleImage: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_IMAGE:
            return {
                ...state,
                getImage: actions.data,
            };
        case POST_SINGLE_IMAGE:
            return {
                ...state,
                postSingleImage: actions.data,
            };
        case POST_MULTIPLE_IMAGE:
            return {
                ...state,
                postMultipleImage: actions.data,
            };
        default:
            return state;
    }
};
