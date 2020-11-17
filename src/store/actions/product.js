import Swal from 'sweetalert2';
const GET_PRODUCT = 'GET_PRODUCT';
const FIND_PRODUCT = 'FIND_PRODUCT';
const SHOW_PRODUCT = 'SHOW_PRODUCT';
// --- Post Product --- //
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: true,
});
const fetchPostProducts = ({ form, history, setState }) => async () => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;

  try {
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
    const result = await response.json();
    setState({
      isLoading: false,
    });
    if (response.status === 201) {
      Swal.fire({
        title: 'Add Succes!',
        text: '',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });

      history.push('/product');
    } else if (response.status === 400) {
      const Errors = result.message;
      console.log(Errors.length, 'check length');
      if (Errors.length >= 2) {
        Errors.map((err) => {
          return Toast.fire({
            icon: 'error',
            title: err,
            timer: 2500,
            showConfirmButton: false,
          });
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: result.message,
          timer: 2500,
          showConfirmButton: false,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
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
  const result = await response.json();

  if (response.status === 200) {
    Swal.fire({
      title: 'Delete Berhasil!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });
    window.location.reload('/product');
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
    const result = await response.json();

    if (response.status === 200) {
      Swal.fire({
        title: 'Update Berhasil!',
        text: '',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
      });
      history.push('/product');
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
  const result = await response.json();

  if (response.status === 200) {
    Swal.fire({
      title: 'Delete Berhasil!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });
    window.location.reload('/product');
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
  const result = await response.json();

  if (response.status === 201) {
    Swal.fire({
      title: 'Clone Berhasil!',
      text: '',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
    });
    window.location.reload('/product');
  } else {
    Swal.fire({
      title: 'Clone gagal',
      text: result.message,
      icon: 'error',
      showConfirmButton: false,
      timer: 2000,
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
