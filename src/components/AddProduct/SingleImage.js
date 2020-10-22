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
    const { id, onChange, onSubmit, modal, toggle, title, label } = props;

    return (
        <React.Fragment>
            {/* <ModalImage
                buttonLabel={label}
                title={title}
                onClickConfirm={onSubmit}
                modal={modal}
                toggle={toggle}
            >
                <Section> */}
            <input type="file" name="file" id={id} onChange={onChange} />
            <button onClick={onSubmit}>Upload</button>
            {/* </Section>
            </ModalImage> */}
        </React.Fragment>
    );
}
