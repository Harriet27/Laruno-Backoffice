import { GET_USERS_ADMINISTRATOR } from '../actions';

const initialState = [];

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_USERS_ADMINISTRATOR:
            return actions.data;
        default:
            return state;
    }
};
