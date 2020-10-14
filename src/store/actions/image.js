import Swal from 'sweetalert2';
// ---Product Image --- //
const POST_SINGLE_IMAGE = 'POST_SINGLE_IMAGE';
const POST_MULTIPLE_IMAGE = 'POST_MULTIPLE_IMAGE';
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

// --- Single Image --- //
const fetchPostSingleImage = (
    formulir,
    e,
    id,
    setFormulir,
    modal,
    setModal
) => async (dispatch) => {
    // const token = JSON.parse(localStorage.getItem('user')).result.accessToken;

    // var myHeaders = new Headers();
    // myHeaders.append('Authorization', `Bearer ${token}`);
    // let url = `${process.env.REACT_APP_API_LIVE}/api/v1/upload/products`;
    // var formdata = new FormData();
    // formdata.append('file', form.file, form.file.name);

    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: formdata,
    //     redirect: 'follow',
    // };
    // const response = await fetch(url, requestOptions);
    // const result = await response.json();
    // console.log(result, 'isi result apa');
    // dispatch(postSingleImage(result));
    // const Toast = Swal.mixin({
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer);
    //         toast.addEventListener('mouseleave', Swal.resumeTimer);
    //     },
    // });

    // Toast.fire({
    //     icon: 'success',
    //     title: 'Upload successfully',
    // });
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;

    let image = formulir.image;
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    let url = `${process.env.REACT_APP_API_LIVE}/api/v1/upload/products`;
    var formdata = new FormData();
    formdata.append('file', image[id], image.name);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
    };
    const response = await fetch(url, requestOptions);
    console.log(response, 'response isinya apa sih');
    const result = await response.json();
    image[id] = result.result.url;
    setFormulir({ image });
    console.log(result, 'isi result apa');
    // dispatch(postSingleImage(result));

    setModal(!modal);
};

// --- Post Multiple Image --- //
const fetchPostMultipleImage = (form) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('user')).result.accessToken;

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    let url = `${process.env.REACT_APP_API_LIVE}/api/v1/upload/products/multiple`;
    var formdata = new FormData();

    formdata.append('file', form.file);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow',
    };
    const response = await fetch(url, requestOptions);
    const result = await response.json();
    console.log(result, 'isi result apa');
    dispatch(postMultipleImage(result));
};

// --- Post Single Image --- //

export {
    postSingleImage,
    POST_SINGLE_IMAGE,
    fetchPostSingleImage,
    fetchPostMultipleImage,
    postMultipleImage,
    POST_MULTIPLE_IMAGE,
};
