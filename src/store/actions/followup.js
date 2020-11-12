import Swal from 'sweetalert2';
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

// --- Post Follow Up --- //
const fetchPostFollowUp = (form) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/followup`;
  const options = {
    body: JSON.stringify(form),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  await response.json();

  if (response.status === 201) {
    Swal.fire({
      title: 'Add Succes!',
      text: '',
      icon: 'success',
    });

    window.location.reload();
  }
};

// --- Put follow Up --- //
const fetchPutFollowUp = () => async () => {};

export { getFollowUp, FOLLOW_UP, fetchGetFollowUp, fetchPostFollowUp };
