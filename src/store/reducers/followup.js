import { FOLLOW_UP, FOLLOW_UP_BY_ID } from '../actions';

const initialState = {
  getFollowUp: null,
  getFollowUpById: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case FOLLOW_UP:
      return {
        ...state,
        getFollowUp: actions.data,
      };
    case FOLLOW_UP_BY_ID:
      return {
        ...state,
        getFollowUpById: actions.data,
      };
    default:
      return state;
  }
};
