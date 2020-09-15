import Swal from 'sweetalert2';
import { getOrder } from './tes';
const GET_ORDER = 'GET_ORDER';

// --- Post Product --- //

const fetchPostOrders = (form, history) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/orders`;

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

        history.push('/');
    }
};

// --- Get Orders --- //
const getProduct = (data) => {
    return {
        type: GET_ORDER,
        data,
    };
};

const fetchGetOrders = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
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
        dispatch(getOrder(result));
    } catch (error) {
        console.log(error);
    }
};

export { getOrder, GET_ORDER, fetchGetOrders, fetchPostOrders };
