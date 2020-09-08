import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostLogin } from "../../store/actions";

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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {/* section */}
                <div>
                    <label>Password</label>
                    <div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {/* section */}

                <button>register</button>
            </form>
        </div>
    );
}
