import { GET_CONTENTS, SHOW_CONTENTS } from '../actions';

const initialState = {
    getContents: null,
    showContents: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_CONTENTS:
            return {
                ...state,
                getContents: actions.data,
            };
        case SHOW_CONTENTS:
            return {
                ...state,
                showContents: actions.data,
            };
        default:
            return state;
    }
};
