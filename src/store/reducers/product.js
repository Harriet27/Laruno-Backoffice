import { GET_PRODUCT } from '../actions';

const initialState = [];

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_PRODUCT:
            return actions.data;
        default:
            return state;
    }
};
