import React, { useState } from 'react';
import { fetchPostSingleImage } from '../../store/actions';
import TestImage from './TestImage';
export default function TestUploadIMage() {
    const [form, setForm] = useState({
        image: {},
        posting: null,
    });

    console.log(form, 'form tes upload image');
    const handleChange = (event) => {
        let image = form.image;
        let field = event.target.id;
        image[field] = event.target.files[0];
        console.log(image[field], 'field ini apa');
        setForm({ ...form, image });
        console.log(event.target.files, 'target files');
        console.log(event.target.files[0], 'target files pake indeks 0');
        if (event.target.files && event.target.files[0]) {
            var img = event.target.files[0];
            setForm({ ...form, posting: URL.createObjectURL(img) });
        }
    };
    const handleSubmit = async (event, id) => {
        event.preventDefault();

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
    };
    return (
        <div>
            <TestImage
                onChange={handleChange}
                id="image-test"
                onSubmit={(e) => handleSubmit(e, 'image-test')}
            />
            {form.posting === null ? null : form.posting === undefined ? (
                'Succes'
            ) : (
                <img src={form.posting} alt={form.posting} />
            )}
        </div>
    );
}
