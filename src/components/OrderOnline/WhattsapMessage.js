import React, { useState } from 'react';
import { Input } from '../../elements/Styled/StyledForm';
import { Form, Span } from '../../elements/Styled/StyledTabs';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function WhattsapMessage(props) {
  const {
    name,
    phone_number,
    message,
    toggle,
    total_price,
    total_qty,
    // payment_method,
    invoice,
    email,
  } = props;
  const InputValue = (props) => {
    const [form, setForm] = useState({
      name: name,
      phone_number: phone_number,
      message: message,
      total_price: total_price,
      total_qty: total_qty,
      // payment_method: payment_method,
      invoice: invoice,
      email: email,
    });

    form.message = form.message.replace(
      /\{\{(.+?)\}\}/g,
      (matching, value) => form[value.trim()]
    );

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
          value={form.phone_number}
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
        phone_number={phone_number}
        total_price={total_price}
        total_qty={total_qty}
        message={message}
        // payment_method={payment_method}
        toggle={toggle}
        invoice={invoice}
        email={email}
      />
    </div>
  );
}
