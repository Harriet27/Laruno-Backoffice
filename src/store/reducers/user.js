import {
    GET_USERS_ADMINISTRATOR,
    GET_USERS_AUTHENTICATION,
    LOGOUT,
} from '../actions';

const initialState = {
    userAdministrator: null,
    userAuthentication: null,
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
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};
