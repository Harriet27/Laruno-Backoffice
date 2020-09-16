import Swal from 'sweetalert2';
const GET_TOPIC = 'GET_TOPIC';

// --- Get Topic --- //
const getTopic = (data) => {
    return {
        type: GET_TOPIC,
        data,
    };
};

const fetchGetTopic = () => async (dispatch) => {
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics`;
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
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
    dispatch(getTopic(result));
};

// --- Create New Topic, Method Post, component AddNewTopic --- //
const fetchPostTopic = (form) => async () => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
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
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/topics/${id}`;
        const options = {
            method: 'PATCH',
            body: JSON.stringify(form),
            headers: {
                'Access-Control-Allow-Origin': 'PATCH',
                'Content-Type': 'application/json',
                Accept: 'application/json',
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
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
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

export {
    getTopic,
    GET_TOPIC,
    fetchGetTopic,
    fetchPostTopic,
    fetchUpdateTopic,
    fetchDeleteTopic,
};
