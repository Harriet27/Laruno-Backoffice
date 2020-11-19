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
    id,
  } = props;
  const InputValue = (props) => {
    const [form, setForm] = useState({
      name: name || '',
      phone_number: phone_number || '',
      message: message || '',
      total_price: total_price || '',
      total_qty: total_qty || '',
      // payment_method: payment_method,
      invoice: invoice || '',
      email: email || '',
    });

    const whattsap = message.replace(
      /\{\{(.+?)\}\}/g,
      (matching, value) => form[value.trim()]
    );
    const [state, setState] = useState({
      phone_number: phone_number || '',
      message: whattsap || '',
    });
    const handleChange = (e) => {
      setState({ ...state, [e.target.name]: e.target.value });
    };
    console.log({ form, message }, 'LIHAT');
    function raiseInvoiceClicked() {
      const Phone_number =
        state.phone_number.substring(0, 0) +
        '62' +
        state.phone_number.substring(1);

      const Message = encodeURI(state.message);
      const url = `https://wa.me/${Phone_number}?text=${Message}`;
      window.open(url, '_blank');
      // Testing local storage
      // localStorage.setItem(id, '#8dc63f');
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
          name="phone_number"
          value={state.phone_number}
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
          value={state.message}
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
