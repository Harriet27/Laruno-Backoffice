import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostLogin } from "../../store/actions";
import Card from "../../elements/Card/Card";
export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    // logic ketika di submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostLogin(form, history));
    };
    // untuk handlechange
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    console.log(form);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card isNormal style={{ padding: "50px", width: "500px" }}>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Laruno
                </h1>
                <form onSubmit={handleSubmit}>
                    <div
                        style={{
                            width: "100%",
                            marginBottom: "20px",
                        }}
                    >
                        <div>
                            <input
                                style={{ width: "100%", padding: "10px" }}
                                type="email"
                                name="email"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email.."
                                required
                            />
                        </div>
                    </div>
                    {/* section */}
                    <div
                        style={{
                            width: "100%",
                            marginBottom: "20px",
                        }}
                    >
                        <div>
                            <input
                                style={{ width: "100%", padding: "10px" }}
                                type="password"
                                name="password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password.."
                                required
                            />
                        </div>
                    </div>
                    {/* section */}

                    <button style={{ width: "100%", padding: "10px" }}>
                        Login
                    </button>
                </form>
            </Card>
        </div>
    );
}
