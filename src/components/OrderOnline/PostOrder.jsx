import React, { useState } from 'react';
import ModalOrder from './ModalOrder';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostTesting } from '../../store/actions';
// test fungsi dari modal
export default function PostOrder() {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    // --- handle Change --- //
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    // --- handle Submit --- //
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(fetchPostTesting(form));
    };

    return (
        <div>
            <ModalOrder
                onClickConfirm={handleSubmit}
                buttonLabel="Add Order"
                modalBody={
                    <React.Fragment>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            id="total_price"
                            name="total_price"
                            value={form.total_price}
                            onChange={handleChange}
                        />
                    </React.Fragment>
                }
            />
        </div>
    );
}
