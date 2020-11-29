import { GET_TOPIC, SHOW_TOPIC, GET_LIST_TOPIC } from '../actions/topic';

const initialState = {
  getTopic: null,
  getListTopic: null,
  showTopic: null,
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case GET_TOPIC:
      return { ...state, getTopic: actions.data };
    case SHOW_TOPIC:
      return { ...state, showTopic: actions.data };
    case GET_LIST_TOPIC:
      return { ...state, getListTopic: actions.data };
    default:
      return state;
  }
};
