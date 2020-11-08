import {
    GET_USERS_ADMINISTRATOR,
    GET_USERS_AUTHENTICATION,
    GET_SHOW_USERS,
    LOGOUT,
} from '../actions';

const initialState = {
    userAdministrator: null,
    userAuthentication: null,
    showUsers: null,
};

export default (state = initialState, actions) => {
    switch (actions.type) {
        case GET_USERS_ADMINISTRATOR:
            return {
                ...state,
                userAdministrator: actions.data,
            };
        case GET_USERS_AUTHENTICATION:
            return {
                ...state,
                userAuthentication: actions.data,
            };
        case GET_SHOW_USERS:
            return {
                ...state,
                showUsers: actions.data,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
