import Swal from 'sweetalert2';
const GET_COUPONS = 'GET_COUPONS';

const SHOW_COUPONS = 'SHOW_COUPONS';
// --- Post Coupons --- //

const fetchPostCoupons = (form, history) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/coupons`;

  // --- apabila form itu kosong maka hapus formnya --- //
  for (let key in form) {
    if (form[key] === '') {
      delete form[key];
    }
  }
  // --- penting nih --- //

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

    window.location.reload('/coupons');
  }
};

// --- Get Coupons --- //
const getCoupons = (data) => {
  return {
    type: GET_COUPONS,
    data,
  };
};

const fetchGetCoupons = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/coupons`;
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(getCoupons(result));
  } catch (error) {
    console.log(error);
  }
};

// --- Find Coupons, Method POST, Search --- //

const fetchFindCoupons = (form) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/coupons/find/search`;

  // --- apabila form itu kosong maka hapus formnya --- //
  for (let key in form) {
    if (form[key] === '') {
      delete form[key];
    }
  }
  // --- penting nih --- //

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
};

// --- DELETE TOPIC METHOD DELETE --- //
const fetchDeleteCoupons = (id) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/coupons/${id}`;
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
    });
    window.location.reload('/coupons');
  } else {
    Swal.fire({
      title: 'Delete gagal',
      text: '',
      icon: 'error',
    });
  }
};

//  ---  Show Coupons Method Get --- //
const showCoupons = (data) => {
  return {
    type: SHOW_COUPONS,
    data,
  };
};

const fetchShowCoupons = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/coupons/${id}`;
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
  dispatch(showCoupons(result.data));
};

// --- Update Coupons - Method PUT ---- //
const fetchUpdateCoupons = (form, id) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/coupons/${id}`;

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
    await response.json();

    if (response.status === 200) {
      Swal.fire({
        title: 'Update Berhasil!',
        text: '',
        icon: 'success',
      });
      window.location.reload('coupons');
    } else {
      Swal.fire({
        title: 'update gagal',
        text: '',
        icon: 'error',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// --- Multiple Delete --- //
const fetchMultipleDeleteCoupons = (form) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/coupons/delete/multiple`;
  const options = {
    method: 'DELETE',
    body: JSON.stringify(form),
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
    });
    window.location.reload('/coupons');
  } else {
    Swal.fire({
      title: 'Delete gagal',
      text: '',
      icon: 'error',
    });
  }
};

// --- Clone Method POST, Multiple Clone--- //
const fetchMultipleCloneCoupons = (form) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/coupons/multiple/clone`;
  const options = {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  await response.json();

  if (response.status === 201) {
    Swal.fire({
      title: 'Clone Berhasil!',
      text: '',
      icon: 'success',
    });
    window.location.reload('/coupons');
  } else {
    Swal.fire({
      title: 'Clone gagal',
      text: '',
      icon: 'error',
    });
  }
};
export {
  fetchPostCoupons,
  fetchGetCoupons,
  fetchFindCoupons,
  getCoupons,
  GET_COUPONS,
  SHOW_COUPONS,
  fetchDeleteCoupons,
  fetchShowCoupons,
  showCoupons,
  fetchUpdateCoupons,
  fetchMultipleDeleteCoupons,
  fetchMultipleCloneCoupons,
};
