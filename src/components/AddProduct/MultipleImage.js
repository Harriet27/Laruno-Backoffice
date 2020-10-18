import React, { useState } from 'react';

import { fetchPostSingleImage } from '../../store/actions';
import SingleImage from './SingleImage';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import ModalImage from '../../elements/Modal/ModalImage';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;

export default function MultipleImage(props) {
    const dispatch = useDispatch();
    const { id, onChange, onSubmit } = props;
    const [formulir, setFormulir] = useState({
        image: [],
    });
    const [arr, setArr] = useState([]);
    console.log(arr);
    console.log(formulir, 'isi dari formulir ini apa');

    // console.log(formulir.image[0], 'array 1');
    const handleChange = (e) => {
        let image = formulir.image;

        let field = e.target.id;

        image[field] = e.target.files[0];

        setFormulir({ image });
    };
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const handleSubmit = async (e, id) => {
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('user')).result
            .accessToken;

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
    };

    const handlePush = () => {
        const values = [...arr];
        values.push(formulir.image.image_bonus);
        setArr(values);
    };
    return (
        <React.Fragment>
            <SingleImage
                modal={modal}
                toggle={toggle}
                id="image_bonus"
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e, 'image_bonus')}
            />
            <button onClick={handlePush}>Click</button>
            {arr.map((item, i) => {
                return <img key={i} src={item} alt={item} />;
            })}
        </React.Fragment>
    );
}
