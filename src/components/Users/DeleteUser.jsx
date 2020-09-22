import React from 'react';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchDeleteAdministrator } from '../../store/actions';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;

export default function DeleteTopic(props) {
    const dispatch = useDispatch();

    // --- Fetch Submit Method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchDeleteAdministrator(props.id));
    };

    return (
        <React.Fragment>
            <ModalSmart
                buttonLabel="delete"
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
