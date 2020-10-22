import React, { useState } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchPostTopic } from '../../store/actions';

// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';

// --- Styled Components --- //
const [md, lg] = ['16px', '18px', '20px'];

const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: ${md};
    font-weight: 400;
    color:${(props) => (props.isButton ? 'white' : '#495057')} ;
    border-radius: 3px;
    background-color: ${(props) => (props.isButton ? '#0098DA' : '#FCFCFC')};
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;

const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: ${lg};
`;

export default function AddNewTopic() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
    });

    // --- Fetch submit method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostTopic(form));
    };
    // --- Change Value when Input Active --- //
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <ModalSmart
            buttonLabel="Add Topic"
            title="Add Topic"
            onClickConfirm={handleSubmit}
        >
            <Card>
                <WrapForm>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                </WrapForm>
            </Card>
        </ModalSmart>
    );
}
