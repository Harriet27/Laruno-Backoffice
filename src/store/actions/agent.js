const GET_AGENTS = 'GET_AGENTS';

// --- Get Agents --- //
const getAgents = (data) => {
  return {
    type: GET_AGENTS,
    data,
  };
};

const fetchGetAgents = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/agents`;
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(getAgents(result));
  } catch (error) {
    console.log(error);
  }
};

export { GET_AGENTS, fetchGetAgents, getAgents };
