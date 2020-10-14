import React, { useState } from 'react';

import { fetchPostSingleImage } from '../../store/actions';

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

export default function SingleImage(props) {
    const dispatch = useDispatch();
    const { id, onChange, onSubmit } = props;
    const [form, setForm] = useState({
        file: null,
    });

    console.log(form, 'ini form');
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const image = useSelector((state) => state.image.imageProduct);
    console.log(image, 'hasilnya');

    // --- Fetch Submit Method Post --- //
    const handleSubmit = async (event) => {
        dispatch(fetchPostSingleImage(form));
        setModal(!modal);
    };

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
                onClickConfirm={onSubmit}
                modal={modal}
                toggle={toggle}
            >
                <Section>
                    <input
                        type="file"
                        name="file"
                        id={id}
                        onChange={onChange}
                    />
                </Section>
            </ModalImage>

            {/* {image !== null && (
                <img src={image.result.url} alt={image.result.url} />
            )} */}
        </React.Fragment>
    );
}
