import Swal from 'sweetalert2';
const GET_TOPIC = 'GET_TOPIC';
const SHOW_TOPIC = 'SHOW_TOPIC';
// --- Get Topic --- //
const getTopic = (data) => {
    return {
        type: GET_TOPIC,
        data,
    };
};

const fetchGetTopic = () => async (dispatch) => {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics`;
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);
    const result = await response.json();

    dispatch(getTopic(result));
};

// --- Create New Topic, Method Post, component AddNewTopic --- //
const fetchPostTopic = (form) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics`;
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
                title: 'Add Topic Berhasil!',
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

// --- Update Topic --- Method PATCH --- //
const fetchUpdateTopic = (form, id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/${id}`;
        for (let key in form) {
            if (form[key] === '') {
                delete form[key];
            }
        }
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
            window.location.reload('/topic');
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

// --- DELETE TOPIC METHOD DELETE --- //
const fetchDeleteTopic = (id) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/${id}`;
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

// --- Show tOPIC By ID --- //
const showTopic = (data) => {
    return {
        type: SHOW_TOPIC,
        data,
    };
};

const fetchShowTopic = (id) => async (dispatch) => {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/${id}`;
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    dispatch(showTopic(result));
};
export {
    getTopic,
    GET_TOPIC,
    fetchGetTopic,
    fetchPostTopic,
    fetchUpdateTopic,
    fetchDeleteTopic,
    showTopic,
    SHOW_TOPIC,
    fetchShowTopic,
};
