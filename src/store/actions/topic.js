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
const fetchPostTopic = (form, history) => async () => {
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
                title: 'Berhasil Login!',
                text: '',
                icon: 'success',
            });
            history.push('/');
        } else {
            Swal.fire({
                title: 'Email atau Password Salah!',
                text: '',
                icon: 'error',
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export { getTopic, GET_TOPIC, fetchGetTopic, fetchPostTopic };
