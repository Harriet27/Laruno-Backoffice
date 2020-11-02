import Swal from 'sweetalert2';
const GET_PAYMENTS_METHOD = 'GET_PAYMENTS_METHOD';

const getPaymentsMethod = (data) => {
    return {
        type: GET_PAYMENTS_METHOD,
        data,
    };
};

const fetchGetPaymentsMethod = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/payments/method`;
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        dispatch(getPaymentsMethod(result));
    } catch (error) {
        console.log(error);
    }
};

// --- Post Payments --- //
const fetchPostPaymentsMethod = (form) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/payments/method`;
        const options = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        await response.json();
        if (response.status === 201) {
            Swal.fire({
                title: 'Tambah Payments Berhasil!',
                text: '',
                icon: 'success',
            });
            window.location.reload('/topic');
        } else {
            Swal.fire({
                title: 'Gagal!',
                text: 'topic yang anda buat sudah tersedia',
                icon: 'error',
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    getPaymentsMethod,
    fetchGetPaymentsMethod,
    GET_PAYMENTS_METHOD,
    fetchPostPaymentsMethod,
};