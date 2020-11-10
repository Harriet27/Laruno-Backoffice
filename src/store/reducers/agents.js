import { GET_AGENTS } from '../actions';

const initialState = {
  getAgents: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_AGENTS:
      return {
        ...state,
        getAgents: actions.data,
      };
    default:
      return state;
  }
};
