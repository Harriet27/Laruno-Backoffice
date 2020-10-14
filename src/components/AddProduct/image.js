import React, { useState } from 'react';
import SingleImage from './SingleImage';

export default function Images() {
    const [form, setForm] = useState({
        image: {},
    });
    console.log(form, 'isi form di image apa aja sih');
    const handleChange = (e) => {
        let image = form.image;

        let field = e.target.id;

        image[field] = e.target.files[0];
        console.log('img[]', image);

        setForm({ image });
        // this.setState({img_value: e.target.files[0]})
    };

    // handlesubmit
    const handleSubmit = async (e, id) => {
        e.preventDefault();

        // let image = form.image;

        // var myHeaders = new Headers();

        // // let stateImg = image[id];/

        // let form_data = new FormData();
        // form_data.append('file', image);

        // // const headers = {
        // //     'Access-Control-Allow-Origin': '*',
        // //     'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        // //     'Content-Type': 'multipart/form-data',
        // // };
        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: form_data,
        //     redirect: 'follow',
        // };
        // fetch('http://139.162.59.84:7000/api/v1/upload/test', requestOptions)
        //     .then((response) => {
        //         console.log(response, 'ini response');
        //         // console.log("response", response.data.result.url);
        //         image[id] = response.data.result.url;
        //         setForm({ image });
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        //  upload image
        const token = JSON.parse(localStorage.getItem('user')).result
            .accessToken;

        let image = form.image;
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
        setForm({ image });
        console.log(result, 'isi result apa');
        // dispatch(postSingleImage(result));
    };
    return (
        <div>
            <SingleImage
                id="image_url"
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e, 'image_url')}
            />
            <SingleImage
                id="video_url"
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e, 'video_url')}
            />
        </div>
    );
}
