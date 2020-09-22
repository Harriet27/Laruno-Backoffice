import { GET_ROLES } from '../actions';

const initialState = {
    getRoles: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_ROLES:
            return {
                ...state,
                getProduct: actions.data,
            };
        default:
            return state;
    }
};
