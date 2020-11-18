import Swal from 'sweetalert2';
const GET_CONTENTS = 'GET_CONTENTS';
const FIND_CONTENTS = 'FIND_CONTENTS';
const SHOW_CONTENTS = 'SHOW_CONTENTS';
// --- Post Fulfillments --- //
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: true,
});
const fetchPostContents = ({ form, history, setState }) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/contents`;

  const options = {
    body: JSON.stringify(form),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, options);
  setState({
    isLoading: false,
  });
  const result = await response.json();
  if (response.status === 201) {
    Swal.fire({
      title: 'Add Succes!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });

    history.push('/contents');
  } else if (response.status === 400) {
    const Errors = result.message;
    if (Errors) {
      Errors.map((err) => {
        return Toast.fire({
          icon: 'error',
          title: err,
        });
      });
    }
  }
};

// --- Get Fulfillments --- //
const getContents = (data) => {
  return {
    type: GET_CONTENTS,
    data,
  };
};

const fetchGetContents = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/contents`;
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(getContents(result));
  } catch (error) {
    console.log(error);
  }
};

// --- Find Fulfillments, Method GET, Search --- //

const findContents = (data) => {
  return {
    type: FIND_CONTENTS,
    data,
  };
};

const fetchFindContents = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/contents/find`;
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(findContents(result));
  } catch (error) {
    console.log(error);
  }
};

// --- DELETE contents METHOD DELETE --- //
const fetchDeleteContents = (id) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/contents/${id}`;
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  await response.json();

  if (response.status === 200) {
    Swal.fire({
      title: 'Delete Berhasil!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });
    window.location.reload('/contents');
  } else {
    Swal.fire({
      title: 'Delete gagal',
      text: '',
      icon: 'error',
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

//  ---  Show Fulfillments Method Get --- //
const showContents = (data) => {
  return {
    type: SHOW_CONTENTS,
    data,
  };
};

const fetchShowContents = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/contents/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();
  dispatch(showContents(result));
};

// --- Update Fulfillments - Method PUT ---- //
const fetchUpdateContents = ({ form, history, setState, id }) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/contents/${id}`;

    // --- apabila form itu kosong maka hapus formnya --- //
    for (let key in form) {
      if (form[key] === '') {
        delete form[key];
      }
    }
    // --- penting nih --- //

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
      isLoading: false,
    });
    if (response.status === 200) {
      Swal.fire({
        title: 'Update Berhasil!',
        text: '',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.reload('/contents');
    } else if (response.status === 400) {
      const Errors = result.message;
      if (Errors) {
        Errors.map((err) => {
          return Toast.fire({
            icon: 'error',
            title: err,
          });
        });
      }
    } else {
      Toast.fire({
        icon: 'error',
        title: result.message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchPostContents,
  fetchGetContents,
  fetchFindContents,
  getContents,
  findContents,
  GET_CONTENTS,
  FIND_CONTENTS,
  SHOW_CONTENTS,
  fetchDeleteContents,
  fetchShowContents,
  showContents,
  fetchUpdateContents,
};
