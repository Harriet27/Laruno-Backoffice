import React, { useState } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPostAdministrator } from '../../store/actions';
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
    color: #495057;
    border-radius: 3px;
    background-color: #FCFCFC;
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

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        phone_number: '',
    });

    // Fetch submit method Post
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostAdministrator(form, history));
    };
    // merubah value setiap kali di ketik
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <Section>
            <Card
                isLogin
                style={{
                    padding: '50px',
                    width: '500px',
                    borderRadius: '5px',
                }}
            >
                <Brand>
                    <div style={{ width: '100%' }}>Add Administrator</div>
                </Brand>
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

                    <WrapForm>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </WrapForm>

                    <WrapForm>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </WrapForm>
                    <WrapForm>
                        <Input
                            type="number"
                            name="phone_number"
                            id="phone_number"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </WrapForm>
                    <Input
                        as="button"
                        style={{ backgroundColor: '#0098DA', color: 'white' }}
                    >
                        Login
                    </Input>
                </form>
            </Card>
        </Section>
    );
}
