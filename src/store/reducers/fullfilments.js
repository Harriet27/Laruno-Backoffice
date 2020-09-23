import { GET_FULLFILMENTS, SHOW_FULLFILMENTS } from '../actions';

const initialState = {
    getFullfilments: null,
    showFullfilments: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_FULLFILMENTS:
            return {
                ...state,
                getFullfilments: actions.data,
            };
        case SHOW_FULLFILMENTS:
            return {
                ...state,
                showFullfilments: actions.data,
            };
        default:
            return state;
    }
};
