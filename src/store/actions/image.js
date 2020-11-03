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
const fetchPostSingleImage = (formulir, e, id, setFormulir) => async (
    dispatch
) => {
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
};

// --- Post Dynamic Image --- //
const fetchPostDynamicImage = (
    formulir,
    e,
    id,
    setFormulir,
    sectionAdd,
    setSectionAdd,
    i
) => async (dispatch) => {
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
    const values = [...sectionAdd];
    values[i].image = formulir.image[`image_section_${i}`];
    setSectionAdd(values);
};

const fetchPostDynamicVideo = (
    formulir,
    e,
    id,
    setFormulir,
    sectionAdd,
    setSectionAdd,
    i
) => async (dispatch) => {
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
    const values = [...sectionAdd];
    values[i].url = formulir.image[`video_section_${i}`];
    setSectionAdd(values);
};

// --- Post Dynamic Image --- //
const fetchPostDynamicPodcast = (
    formulir,
    e,
    id,
    setFormulir,
    sectionAdd,
    setSectionAdd,
    i
) => async (dispatch) => {
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
    const values = [...sectionAdd];
    values[i].url = formulir.image[`podcast_section_${i}`];
    setSectionAdd(values);
};

// --- Post Multiple Image --- //
const fetchPostMultipleImage = (
    formulir,
    e,
    id,
    setFormulir,
    arr,
    setArr
) => async (dispatch) => {
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
    const values = { ...arr };
    values[id].push(formulir.image[id]);
    setArr(values);
};

// --- Post Single Image --- //

export {
    postSingleImage,
    POST_SINGLE_IMAGE,
    fetchPostSingleImage,
    fetchPostMultipleImage,
    fetchPostDynamicImage,
    fetchPostDynamicVideo,
    fetchPostDynamicPodcast,
    postMultipleImage,
    POST_MULTIPLE_IMAGE,
};
