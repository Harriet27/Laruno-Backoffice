const FOLLOW_UP = 'FOLLOW_UP';

const getFollowUp = (data) => {
  return {
    type: FOLLOW_UP,
    data,
  };
};

const fetchGetFollowUp = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/followup`;
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(getFollowUp(result));
  } catch (error) {
    console.log(error);
  }
};

export { getFollowUp, FOLLOW_UP, fetchGetFollowUp };
