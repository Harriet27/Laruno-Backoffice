import { SHOW_TOPIC } from '../actions/topic';

const initialState = [];

export default (state = initialState, actions) => {
    switch (actions.type) {
        case SHOW_TOPIC:
            return actions.data;
        default:
            return state;
    }
};
