import Swal from 'sweetalert2';
const GET_PRODUCT = 'GET_PRODUCT';
const FIND_PRODUCT = 'FIND_PRODUCT';
const SHOW_PRODUCT = 'SHOW_PRODUCT';
// --- Post Product --- //

const fetchPostProducts = (form, history) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products`;

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

    history.push('/product');
  } else if (response.status === 400) {
    Swal.fire({
      title: 'check kembali!',
      text: '',
      icon: 'warning',
    });
    window.location.reload();
  } else {
    Swal.fire({
      title: 'Sedang dalam perbaikan!',
      text: '',
      icon: 'error',
    });
  }
};

// --- Get Product --- //
const getProduct = (data) => {
  return {
    type: GET_PRODUCT,
    data,
  };
};

const fetchGetProduct = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products`;
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(getProduct(result));
  } catch (error) {
    console.log(error);
  }
};

// --- Find Product, Method POST, Search --- //
const findProduct = (data) => {
  return {
    type: FIND_PRODUCT,
    data,
  };
};

const fetchFindProduct = (form) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/find/search`;

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
  const result = await response.json();
  dispatch(findProduct(result));
};

// --- DELETE TOPIC METHOD DELETE --- //
const fetchDeleteProduct = (id) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/${id}`;
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
    window.location.reload('/topic');
  } else {
    Swal.fire({
      title: 'Delete gagal',
      text: '',
      icon: 'error',
    });
  }
};

//  ---  Show Product Method Get --- //
const showProduct = (data) => {
  return {
    type: SHOW_PRODUCT,
    data,
  };
};

const fetchShowProduct = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();
  dispatch(showProduct(result));
};

// --- Update Product - Method PUT ---- //
const fetchUpdateProduct = (form, id, history) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/${id}`;

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
      history.push('/product');
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
const fetchMultipleDeleteProduct = (form) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/delete/multiple`;
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
    window.location.reload('/product');
  } else {
    Swal.fire({
      title: 'Delete gagal',
      text: '',
      icon: 'error',
    });
  }
};

// --- Clone Method POST, Multiple Clone--- //
const fetchMultipleCloneProduct = (form) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/multiple/clone`;
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
    window.location.reload('/product');
  } else {
    Swal.fire({
      title: 'Clone gagal',
      text: '',
      icon: 'error',
    });
  }
};
export {
  fetchPostProducts,
  fetchGetProduct,
  fetchFindProduct,
  getProduct,
  GET_PRODUCT,
  SHOW_PRODUCT,
  FIND_PRODUCT,
  fetchDeleteProduct,
  fetchShowProduct,
  showProduct,
  fetchUpdateProduct,
  fetchMultipleDeleteProduct,
  fetchMultipleCloneProduct,
  findProduct,
};
