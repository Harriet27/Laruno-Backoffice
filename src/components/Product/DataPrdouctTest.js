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
        file: null,
    });
    console.log(form, 'ini form');
    // console.log(form.image, 'form image');
    // const [image, setImage] = useState('');
    // console.log(image, 'ini file');
    const image = useSelector((state) => state.image.getImage);
    console.log(image, 'hasilnya');
    // --- Fetch Submit Method Post --- //
    const handleSubmit = async (event) => {
        dispatch(fetchPostSingleImage(form));
    };
    // const handleChange = (e) => {
    //     setImage({ [e.target.name]: e.target.value });
    // };
    const handleChange = (e) => {
        // Update the state
        setForm({ file: e.target.files[0] });
    };

    return (
        <React.Fragment>
            {image !== null && (
                <img src={image.result.url} alt={image.result.url} />
            )}
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
