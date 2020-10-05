import React from 'react';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchDeleteProduct } from '../../store/actions';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;

export default function DeleteProduct(props) {
    const dispatch = useDispatch();

    // --- Fetch submit method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchDeleteProduct(props.id));
    };

    return (
        <React.Fragment>
            <ModalSmart
                style={{ backgroundColor: 'red' }}
                buttonLabel={<DeleteIcon />}
                title="Delete Product"
                onClickConfirm={handleSubmit}
            >
                <Section>
                    <h1>Apakah kamu yakin ingin menghapus Product ini ?</h1>
                </Section>
            </ModalSmart>
        </React.Fragment>
    );
}
