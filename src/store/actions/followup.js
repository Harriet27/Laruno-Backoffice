import Swal from 'sweetalert2';
const FOLLOW_UP = 'FOLLOW_UP';
const FOLLOW_UP_BY_ID = 'FOLLOW_UP_BY_ID';
const getFollowUp = (data) => {
  return {
    type: FOLLOW_UP,
    data,
  };
};

const getFollowUpById = (data) => {
  return {
    type: FOLLOW_UP_BY_ID,
    data,
  };
};

const fetchGetFollowUp = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/followups`;
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

const fetchGetFollowUpByID = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/followups/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result, 'isi result coupons');
  dispatch(getFollowUpById(result));
};

// --- Post Follow Up --- //
const fetchPostFollowUp = (form) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/followups`;
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
      showCofirmButton: false,
      timer: 1000,
    });

    window.location.reload();
  }
};

// --- Put follow Up --- //
const fetchUpdateFollowUp = (form, id) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/followups/${id}`;
    for (let key in form) {
      if (form[key] === '') {
        delete form[key];
      }
    }
    const options = {
      method: 'PUT',
      body: JSON.stringify(form),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();

    if (response.status === 200) {
      Swal.fire({
        title: 'Update Berhasil!',
        text: '',
        icon: 'success',
        showCofirmButton: false,
        timer: 1000,
      });
      window.location.reload('/topic');
    } else {
      Swal.fire({
        title: 'update gagal',
        text: '',
        icon: 'error',
        showCofirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  getFollowUp,
  FOLLOW_UP,
  FOLLOW_UP_BY_ID,
  fetchGetFollowUpByID,
  getFollowUpById,
  fetchGetFollowUp,
  fetchPostFollowUp,
  fetchUpdateFollowUp,
};
