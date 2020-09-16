import Swal from 'sweetalert2';
const GET_PRODUCT = 'GET_PRODUCT';
const FIND_PRODUCT = 'FIND_PRODUCT';
// --- Post Product --- //

const fetchPostProducts = (form, history) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products`;

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

// --- Get Product --- //
const getProduct = (data) => {
    return {
        type: GET_PRODUCT,
        data,
    };
};

const fetchGetProduct = () => async (dispatch) => {
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
        dispatch(getProduct(result));
    } catch (error) {
        console.log(error);
    }
};

// --- Find Product, Method GET, Search --- //

const findProduct = (data) => {
    return {
        type: FIND_PRODUCT,
        data,
    };
};

const fetchFindProduct = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/products/find`;
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        dispatch(findProduct(result));
    } catch (error) {
        console.log(error);
    }
};

// --- DELETE TOPIC METHOD DELETE --- //
const fetchDeleteProduct = (id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
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

export {
    fetchPostProducts,
    fetchGetProduct,
    fetchFindProduct,
    getProduct,
    findProduct,
    GET_PRODUCT,
    FIND_PRODUCT,
    fetchDeleteProduct,
};
