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

// --- Multiple Image --- //
const fetchPostMultipleImage = (form) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    const url = `${process.env.REACT_APP_API_LIVE}/api/v1/uploads/multiple`;

    const options = {
        body: form,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(url, options);
    await response.json();
    const result = await response.json();
    dispatch(postMultipleImage(result));
};

// --- Single Image --- //
const fetchPostSingleImage = (form) => (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;
    // try {
    //     const url = `${process.env.REACT_APP_API_LIVE}/api/v1/uploads`;
    //     const options = {
    //         body: form,
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             Authorization: `Bearer ${token}`,
    //         },
    //     };

    //     const response = await fetch(url, options);
    //     const result = await response.json();
    //     dispatch(postSingleImage(result));
    // } catch (error) {
    //     console.log(error);
    // }
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append('image', form);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
    };

    fetch('http://139.162.59.84:7000/api/v1/uploads', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
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
