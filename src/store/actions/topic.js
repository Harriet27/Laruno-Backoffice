import Swal from 'sweetalert2';
const GET_TOPIC = 'GET_TOPIC';
const SHOW_TOPIC = 'SHOW_TOPIC';
const GET_LIST_TOPIC = 'GET_LIST_TOPIC';
// --- Get Topic --- //
const getTopic = (data) => {
  return {
    type: GET_TOPIC,
    data,
  };
};
const getListTopic = (data) => {
  return {
    type: GET_LIST_TOPIC,
    data,
  };
};

const fetchGetTopic = () => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics`;
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();

  dispatch(getTopic(result));
};
const fetchGetListTopic = () => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/list/count`;
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();

  dispatch(getListTopic(result));
};

// --- Create New Topic, Method Post, component AddNewTopic --- //
const fetchPostTopic = (form, setState) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics`;
    const options = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    setState({
      isPost: false,
    });
    if (response.status === 201) {
      Swal.fire({
        title: 'Add Topic Berhasil!',
        text: '',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.reload('/topic');
    } else {
      Swal.fire({
        title: 'Gagal!',
        text: result.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// --- Update Topic --- Method PATCH --- //
const fetchUpdateTopic = ({ form, id, setState }) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/${id}`;
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
    setState({
      isUpdate: false,
    });
    if (response.status === 200) {
      Swal.fire({
        title: 'Update Berhasil!',
        text: '',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.reload('/topic');
    } else {
      Swal.fire({
        title: 'update gagal',
        text: result.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// --- DELETE TOPIC METHOD DELETE --- //
const fetchDeleteTopic = (id) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();

  if (response.status === 200) {
    Swal.fire({
      title: 'Delete Berhasil!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });
    window.location.reload('/topic');
  } else {
    Swal.fire({
      title: 'Delete gagal',
      text: result.message,
      icon: 'error',
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

// --- Show tOPIC By ID --- //
const showTopic = (data) => {
  return {
    type: SHOW_TOPIC,
    data,
  };
};

const fetchShowTopic = (id) => async (dispatch) => {
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/${id}`;
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();
  console.log(result);
  dispatch(showTopic(result));
};

// --- Multiple Delete --- //
const fetchMultipleDeleteTopics = (form) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/delete/multiple`;
  const options = {
    method: 'DELETE',
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
      title: 'Delete Berhasil!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });
    window.location.reload('/topic');
  } else {
    Swal.fire({
      title: 'Delete gagal',
      text: result.message,
      icon: 'error',
      showConfirmButton: false,
      timer: 2000,
    });
  }
};
export {
  getTopic,
  GET_TOPIC,
  fetchGetTopic,
  fetchPostTopic,
  fetchUpdateTopic,
  fetchDeleteTopic,
  fetchMultipleDeleteTopics,
  showTopic,
  SHOW_TOPIC,
  GET_LIST_TOPIC,
  fetchGetListTopic,
  fetchShowTopic,
};
