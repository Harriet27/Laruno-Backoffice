import React, { useState, useEffect } from "react";
import Styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostLogin } from "../../store/actions";
import Card from "../../elements/Card/Card";
import ImageBrand from "../../assets/images/laruno1.png";

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    height: 100vh;  
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #D9DEE2;
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
        email: "",
        password: "",
    });

    // Fetch submit method Post
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostLogin(form, history));
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
                    padding: "50px",
                    width: "500px",
                    borderRadius: "5px",
                }}
            >
                <Brand>
                    <img src={ImageBrand} alt="brand" />
                </Brand>
                <form onSubmit={handleSubmit}>
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

                    <Input
                        as="button"
                        style={{ backgroundColor: "#0098DA", color: "white" }}
                    >
                        Login
                    </Input>
                </form>
            </Card>
        </Section>
    );
}
