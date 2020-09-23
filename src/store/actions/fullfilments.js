import Swal from 'sweetalert2';
const GET_FULLFILMENTS = 'GET_FULLFILMENTS';
const FIND_FULLFILMENTS = 'FIND_FULLFILMENTS';
const SHOW_FULLFILMENTS = 'SHOW_FULLFILMENTS';
// --- Post Fullfilments --- //

const fetchPostFullfilments = (form, history) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/fullfilments`;

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

// --- Get Fullfilments --- //
const getFullfilments = (data) => {
    return {
        type: GET_Fullfilments,
        data,
    };
};

const fetchGetFullfilments = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/fullfilments`;
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        dispatch(getFullfilments(result));
    } catch (error) {
        console.log(error);
    }
};

// --- Find Fullfilments, Method GET, Search --- //

const findFullfilments = (data) => {
    return {
        type: FIND_Fullfilments,
        data,
    };
};

const fetchFindFullfilments = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/fullfilments/find`;
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        dispatch(findFullfilments(result));
    } catch (error) {
        console.log(error);
    }
};

// --- DELETE fullfilments METHOD DELETE --- //
const fetchDeleteFullfilments = (id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/fullfilments/${id}`;
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
        window.location.reload('/fullfilments');
    } else {
        Swal.fire({
            title: 'Delete gagal',
            text: '',
            icon: 'error',
        });
    }
};

//  ---  Show Fullfilments Method Get --- //
const showFullfilments = (data) => {
    return {
        type: SHOW_Fullfilments,
        data,
    };
};

const fetchShowFullfilments = (id) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/fullfilments/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(showFullfilments(result));
};

// --- Update Fullfilments - Method PUT ---- //
const fetchUpdateFullfilments = (form, id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/fullfilments/${id}`;

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
            window.location.reload('/Fullfilments');
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
    fetchPostFullfilments,
    fetchGetFullfilments,
    fetchFindFullfilments,
    getFullfilments,
    findFullfilments,
    GET_FULLFILMENTS,
    FIND_FULLFILMENTS,
    SHOW_FULLFILMENTS,
    fetchDeleteFullfilments,
    fetchShowFullfilments,
    showFullfilments,
    fetchUpdateFullfilments,
};
