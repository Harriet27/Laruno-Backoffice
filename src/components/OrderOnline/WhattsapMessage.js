import React, { useState } from 'react';
import { Input } from '../../elements/Styled/StyledForm';
import { Form, Span } from '../../elements/Styled/StyledTabs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function WhattsapMessage(props) {
    const { name, number, message, toggle } = props;
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
            const Phone_number =
                form.number.toString().substring(0, 0) +
                '62' +
                form.number.toString().substring(1);

            const Message = encodeURI(form.message);
            const url = `https://wa.me/${Phone_number}?text=${Message}`;
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
                    value={form.number}
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
                    value={form.message}
                    onChange={handleChange}
                />
                <ModalFooter>
                    <Button
                        color="white"
                        style={{ border: '1px solid gray' }}
                        onClick={props.toggle}
                    >
                        Cancel
                    </Button>{' '}
                    <Button color="primary" onClick={raiseInvoiceClicked}>
                        Follow Up
                    </Button>{' '}
                </ModalFooter>
            </>
        );
    };

    return (
        <div>
            <InputValue
                name={name}
                number={number}
                message={message}
                toggle={toggle}
            />
        </div>
    );
}
