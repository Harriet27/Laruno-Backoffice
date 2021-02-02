// import Swal from 'sweetalert2';

const GET_ORDERS = 'GET_ORDERS';
const DETAIL_ORDERS = 'DETAIL_ORDERS';

// --- Get Orders --- //
const getOrder = (data) => {
  return {
    type: GET_ORDERS,
    data,
  };
};

const fetchGetOrders = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  try {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/orders/list`;
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(getOrder(result));
  } catch (error) {
    console.log(error);
  }
};

//  ---  Show Orders Method Get --- //
const detailOrders = (data) => {
  return {
    type: DETAIL_ORDERS,
    data,
  };
};

const fetchShowOrders = (id) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/orders/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, options);
  const result = await response.json();
  dispatch(detailOrders(result));
};

const actionOrder = async (id, status) => {
  const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/orders/${id}?status=${status}`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  const res = await fetch(url, options);
  const result = await res.json();
  console.log(result);
}

export {
  getOrder,
  GET_ORDERS,
  fetchGetOrders,
  detailOrders,
  fetchShowOrders,
  actionOrder,
  DETAIL_ORDERS,
};
