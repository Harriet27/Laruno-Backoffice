import React, { useState, useEffect } from 'react';
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchUpdateTopic, fetchShowTopic } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Styled from 'styled-components';

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
const Brand = Styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;
const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: 20px;
`;
// --- Styled Components --- //

export default function UpdateTopic(props) {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
    });

    // Fetch submit method Post
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchUpdateTopic(form, props.id));
    };
    // merubah value setiap kali di ketik
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <React.Fragment>
            <ModalSmart
                buttonLabel="Update"
                title="Update Topic"
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
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </WrapForm>
                        </div>
                    </Card>
                </Section>
            </ModalSmart>
        </React.Fragment>
    );
}
