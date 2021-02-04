// import Swal from 'sweetalert2';

import Axios from 'axios';

const GET_ORDERS = 'GET_ORDERS';
const DETAIL_ORDERS = 'DETAIL_ORDERS';
const DETAIL_PAYMENT = 'DETAIL_PAYMENT';

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
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/orders/${id}/detail`;
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
  console.log('fetchShowOrders', result.data.status);
};

const detailPayment = data => {
  return {
    type: DETAIL_PAYMENT,
    data
  }
}

const fetchOrderPaymentDetail = id => async dispatch => {
  const url = `${process.env.REACT_APP_API_LIVE}/api/v1/payments/method/${id}`;
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  }
  const response = await fetch(url, options);
  const result = await response.json();
  dispatch(detailPayment(result));
}

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
  window.location.reload();
}

export {
  getOrder,
  GET_ORDERS,
  fetchGetOrders,
  detailOrders,
  fetchShowOrders,
  detailPayment,
  fetchOrderPaymentDetail,
  actionOrder,
  DETAIL_ORDERS,
  DETAIL_PAYMENT
};
