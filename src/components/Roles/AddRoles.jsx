import React, { useState } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchPostRoles } from '../../store/actions';

// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: 18px;
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
    margin-bottom: 20px;
`;

export default function AddRoles() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        adminType: '',
        readWrite: false,
    });

    // --- Fetch submit method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostRoles(form));
    };

    // --- Change Value when Input Active --- //
    const handleChange = (event) => {
        setForm({
            ...form,
            adminType: event.target.value,
        });
    };
    const handleCheckbox = (event) => {
        setForm({
            ...form,
            readWrite: true,
        });
    };
    console.log(form, 'checkbox');
    return (
        <ModalSmart
            buttonLabel="Add Roles"
            title="Add Roles"
            onClickConfirm={handleSubmit}
        >
            <Section>
                <Card isLogin>
                    <div>
                        <WrapForm>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={form.adminType}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        </WrapForm>

                        <WrapForm>
                            <Input
                                type="checkbox"
                                name="readWrite"
                                id="readWrite"
                                value={form.readWrite}
                                onChange={handleCheckbox}
                            />
                        </WrapForm>
                    </div>
                </Card>
            </Section>
        </ModalSmart>
    );
}
