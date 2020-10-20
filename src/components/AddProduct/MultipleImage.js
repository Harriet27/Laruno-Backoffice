import React, { useState } from 'react';

import { fetchPostSingleImage } from '../../store/actions';
import SingleImage from './SingleImage';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';
import ModalImage from '../../elements/Modal/ModalImage';
import ImageText from '../../components/AddProduct/ImageText';

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
    console.log(arr, 'ini arr');
    console.log(formulir, 'isi dari formulir ini apa');

    // console.log(formulir.image[0], 'array 1');
    const handleChange = (e) => {
        let image = formulir.image;

        let field = e.target.id;

        image[field] = e.target.files[0];
        console.log(field, 'field ini apa');
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

        // test
        const values = [...arr];
        values.push(formulir.image.video);
        setArr(values);
    };

    return (
        <React.Fragment>
            <SingleImage
                modal={modal}
                toggle={toggle}
                id="video"
                onChange={handleChange}
                onSubmit={(e) => handleSubmit(e, 'video')}
            />

            {arr.map((item, index) => {
                return (
                    <video key={index} width="320" height="240">
                        <source src={item} type="video/mp4" />
                        <source src={item} type="video/ogg" />
                    </video>
                );
            })}
        </React.Fragment>
    );
}
