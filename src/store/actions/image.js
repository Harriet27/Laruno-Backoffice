const GET_IMAGE = 'GET_IMAGE';
const POST_SINGLE_IMAGE = 'POST_SINGLE_IMAGE';
const POST_MULTIPLE_IMAGE = 'POST_MULTIPLE_IMAGE';

//  --- for dispatch to reducers --- //

const getImage = (data) => {
    return {
        type: GET_IMAGE,
        data,
    };
};
const postSingleImage = (data) => {
    return {
        type: POST_SINGLE_IMAGE,
        data,
    };
};
const postMultipleImage = (data) => {
    return {
        type: POST_MULTIPLE_IMAGE,
        data,
    };
};

// --- Fetching data Image --- //
const fetchGetImage = (imgpath) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    try {
        const url = `${process.env.REACT_APP_API_LIVE}/api/v1/uploads/${imgpath}`;
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        dispatch(getImage(result));
    } catch (error) {
        console.log(error);
    }
};

// --- Single Image --- //
const fetchPostMultipleImage = (form) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/uploads`;

    const options = {
        body: JSON.stringify(form),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(postSingleImage(result));
};

// --- Multiple Image --- //
const fetchPostSingleImage = (form) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/uploads/multiple`;

    const options = {
        body: JSON.stringify(form),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(postMultipleImage(result));
};

export {
    getImage,
    postSingleImage,
    postMultipleImage,
    GET_IMAGE,
    POST_MULTIPLE_IMAGE,
    POST_SINGLE_IMAGE,
    fetchGetImage,
    fetchPostSingleImage,
    fetchPostMultipleImage,
};
