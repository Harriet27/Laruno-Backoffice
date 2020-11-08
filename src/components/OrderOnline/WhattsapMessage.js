import React, { useState } from 'react';
import { Input } from '../../elements/Styled/StyledForm';
import { Span } from '../../elements/Styled/StyledTabs';
export default function WhattsapMessage(props) {
    const { name, number, message } = props;
    const InputValue = (props) => {
        const [form, setForm] = useState({
            name: props.name,
            number: props.number,
            message: props.message,
        });
        console.log(form, 'ini form black');
        const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
        };

        function raiseInvoiceClicked() {
            // %0A INI UNTUK ENTER
            // %20 INI UNTUK SPACE
            // form.text = form.text.replace(/\s+/g, '%20');

            const phone =
                form.number.toString().substring(0, 0) +
                '62' +
                form.number.toString().substring(1);

            const messageWhattsap = form.message
                .toString()
                .replace(/\n+/g, '%0A', /\s+/g, '%20');
            const url = `https://wa.me/${phone}?text=${messageWhattsap}`;

            window.open(url, '_blank');
            // window.location.href = url;
        }
        return (
            <>
                {' '}
                <div>
                    <label>
                        <Span>Nama : {form.name}</Span>
                    </label>
                </div>
                <label>
                    <Span>Nomor Telephone</Span>
                </label>
                <Input
                    style={{ width: '100%' }}
                    type="number"
                    name="number"
                    defaultValue={form.number}
                    onChange={handleChange}
                />
                <label>
                    <Span>Message</Span>
                </label>
                <Input
                    style={{ width: '100%' }}
                    as="textarea"
                    rows="5"
                    name="message"
                    defaultValue={form.message}
                    onChange={handleChange}
                />
                <button onClick={raiseInvoiceClicked}>Follow Up</button>
            </>
        );
    };

    return (
        <div>
            <InputValue name={name} number={number} message={message} />
        </div>
    );
}
