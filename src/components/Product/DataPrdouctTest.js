import React, { useState } from 'react';
import ModalSmart from '../../elements/Modal/ModalSmart';
import {
    fetchDeleteRoles,
    fetchPostSingleImage,
    fetchGetImage,
} from '../../store/actions';

import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;

function ModalFile(props) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        image: '',
    });
    const image = '';
    // console.log(form.image, 'form image');
    // const [image, setImage] = useState('');
    // console.log(image, 'ini file');

    const images = useSelector((state) => state.image);
    console.log(images, 'ini image');
    // --- Fetch Submit Method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostSingleImage(form));
    };
    // const handleChange = (e) => {
    //     setImage({ [e.target.name]: e.target.value });
    // };
    const handleChange = (e) => {
        console.log(e, 'handlechange');
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <React.Fragment>
            <ModalSmart
                buttonLabel="delete"
                title="Delete Roles"
                onClickConfirm={handleSubmit}
            >
                <Section>
                    <input
                        type="file"
                        name="image"
                        id="file"
                        onChange={handleChange}
                    />
                </Section>
            </ModalSmart>
        </React.Fragment>
    );
}

export default function DataPrdouctTest() {
    return (
        <div>
            <ModalFile />
        </div>
    );
}
