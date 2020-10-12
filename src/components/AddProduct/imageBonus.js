import React, { useState } from 'react';

import { fetchPostMultipleImage } from '../../store/actions';

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

export default function ImageBonus(props) {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        file: null,
    });
    console.log(form, 'ini form');
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const image = useSelector((state) => state.image);
    console.log(image, 'hasilnya dari multiple image');
    // --- Fetch Submit Method Post --- //
    const handleSubmit = async (event) => {
        dispatch(fetchPostMultipleImage(form));
        setModal(!modal);
    };
    // const handleChange = (e) => {
    //     setImage({ [e.target.name]: e.target.value });
    // };
    const handleChange = (e) => {
        // Update the state
        e.preventDefault();
        setForm({ file: e.target.files[0] });
    };

    return (
        <React.Fragment>
            <ModalImage
                buttonLabel="Update Image"
                title="Update Image"
                onClickConfirm={handleSubmit}
                modal={modal}
                toggle={toggle}
            >
                <Section>
                    <input
                        type="file"
                        name="file[]"
                        id="file"
                        onChange={handleChange}
                        multiple
                    />
                </Section>
            </ModalImage>
            {/* {image !== null && (
                <img src={image.result.url} alt={image.result.url} />
            )} */}
        </React.Fragment>
    );
}
