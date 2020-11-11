import { FOLLOW_UP } from '../actions';

const initialState = {
  getFollowUp: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case FOLLOW_UP:
      return {
        ...state,
        getFollowUp: actions.data,
      };
    default:
      return state;
  }
};
