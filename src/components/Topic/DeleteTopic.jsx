import React, { useState } from 'react';
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchDeleteTopic } from '../../store/actions';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
// import { useHistory } from 'react-router-dom';
// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
   
    align-items: center;
    display: flex;
    justify-content: center;
    
    
`;

// --- Styled Components --- //

export default function DeleteTopic(props) {
    const dispatch = useDispatch();
    // const history = useHistory();
    // Fetch submit method Post
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchDeleteTopic(props.id));
    };

    return (
        <React.Fragment>
            <ModalSmart
                buttonLabel="Delete"
                title="Delete Topic"
                onClickConfirm={handleSubmit}
            >
                <Section>
                    <h1>Apakah kamu yakin ingin menghapus Topic ini ?</h1>
                </Section>
            </ModalSmart>
        </React.Fragment>
    );
}
