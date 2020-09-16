import React, { useState } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPostTopic } from '../../store/actions';
import Card from '../../elements/Card/Card';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    height: 100vh;
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

export default function AddNewTopic() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        name: '',
    });

    // Fetch submit method Post
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostTopic(form, history));
    };
    // merubah value setiap kali di ketik
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <Section>
            <Card isLogin>
                <form onSubmit={handleSubmit}>
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

                    <Input as="button" isButton>
                        Add Topic
                    </Input>
                </form>
            </Card>
        </Section>
    );
}
