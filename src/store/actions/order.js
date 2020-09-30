import Swal from 'sweetalert2';

const GET_ORDER = 'GET_ORDER';

// --- Get Orders --- //
const getOrder = (data) => {
    return {
        type: GET_ORDER,
        data,
    };
};

const fetchGetOrders = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/orders`;
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

export { getOrder, GET_ORDER, fetchGetOrders };
