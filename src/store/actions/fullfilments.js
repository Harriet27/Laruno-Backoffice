import Swal from 'sweetalert2';
const GET_FULFILLMENTS = 'GET_FULFILLMENTS';
const FIND_FULFILLMENTS = 'FIND_FULFILLMENTS';
const SHOW_FULFILLMENTS = 'SHOW_FULFILLMENTS';
// --- Post Fulfillments --- //

const fetchPostFulFillments = (form, history) => async () => {
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

// --- Get Fulfillments --- //
const getFulFillments = (data) => {
    return {
        type: GET_FULFILLMENTS,
        data,
    };
};

const fetchGetFulFillments = () => async (dispatch) => {
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
        dispatch(getFulFillments(result));
    } catch (error) {
        console.log(error);
    }
};

// --- Find Fulfillments, Method GET, Search --- //

const findFulFillments = (data) => {
    return {
        type: FIND_FULFILLMENTS,
        data,
    };
};

const fetchFindFulFillments = () => async (dispatch) => {
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
        dispatch(findFulFillments(result));
    } catch (error) {
        console.log(error);
    }
};

// --- DELETE fulfillments METHOD DELETE --- //
const fetchDeleteFulFillments = (id) => async () => {
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
        });
        window.location.reload('/fulfillments');
    } else {
        Swal.fire({
            title: 'Delete gagal',
            text: '',
            icon: 'error',
        });
    }
};

//  ---  Show Fulfillments Method Get --- //
const showFulFillments = (data) => {
    return {
        type: SHOW_FULFILLMENTS,
        data,
    };
};

const fetchShowFulFillments = (id) => async (dispatch) => {
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
    dispatch(showFulFillments(result));
};

// --- Update Fulfillments - Method PUT ---- //
const fetchUpdateFulFillments = (form, id) => async () => {
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
        await response.json();

        if (response.status === 200) {
            Swal.fire({
                title: 'Update Berhasil!',
                text: '',
                icon: 'success',
            });
            window.location.reload('/Fulfillments');
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

export {
    fetchPostFulFillments,
    fetchGetFulFillments,
    fetchFindFulFillments,
    getFulFillments,
    findFulFillments,
    GET_FULFILLMENTS,
    FIND_FULFILLMENTS,
    SHOW_FULFILLMENTS,
    fetchDeleteFulFillments,
    fetchShowFulFillments,
    showFulFillments,
    fetchUpdateFulFillments,
};
