import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, StylesProvider } from '@material-ui/core';
import moment from 'moment';
import {
  fetchShowTopic,
  fetchUpdateTopic,
  fetchPostSingleImage,
  fetchShowCoupons,
  fetchUpdateCoupons,
} from '../../store/actions';
import Styled from 'styled-components';
import SingleImage from '../AddProduct/SingleImage';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';

const [md, lg] = ['16px', '18px', '20px'];

const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;

const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: ${md};
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

const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: ${lg};
`;

export default function InputUpdateCoupons(props) {
  // ---Input value --- //
  const InputValue = (props) => {
    const {
      name,
      id,
      code,
      value,
      max_discount,
      payment_method,
      is_active,
      start_date,
      end_date,
    } = props;
    const dispatch = useDispatch();

    const [form, setForm] = useState({
      name: name || '',
      code: code || '',
      value: value || '',
      start_date: '',
      end_date: '',
      max_discount: max_discount || 0,
      payment_method: payment_method || '',
      is_active: is_active || false,
    });
    const [state, setState] = useState({
      isLoading: false,
    });
    const handleSubmit = (event) => {
      setState({
        isLoading: true,
      });
      dispatch(fetchUpdateCoupons({ form, id, setState }));
    };
    const handleChange = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };

    // --- Image --- //

    // --- HandleChange upload Image --- //
    const handleCheckbox = () => {
      setForm({ ...form, is_active: !form.is_active });
    };

    // --- handleSubmit Upload Image --- //

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WrapForm style={{ width: '45%' }}>
            <label>
              <Span>Name</Span>
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </WrapForm>

          <WrapForm style={{ width: '45%' }}>
            <label>
              <Span>Coupon Code</Span>
            </label>
            <Input
              type="text"
              name="code"
              id="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Code Coupons"
              required
            />
          </WrapForm>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WrapForm style={{ width: '45%' }}>
            <label>
              <Span>Start Coupons</Span>
            </label>
            <Input
              type="date"
              name="start_date"
              id="start_date"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </WrapForm>

          <WrapForm style={{ width: '45%' }}>
            <label>
              <Span>End Coupons</Span>
            </label>
            <Input
              type="date"
              name="end_date"
              id="end_date"
              value={form.end_date}
              onChange={handleChange}
              placeholder="End Date"
              required
            />
          </WrapForm>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WrapForm style={{ width: '45%' }}>
            <label>
              <Span>Max Discount</Span>
            </label>
            <div style={Styles.PriceBorder}>
              <div style={Styles.PriceRupiah}>
                <div style={Styles.PriceRp}>Rp</div>
              </div>
              <Input
                type="number"
                name="max_discount"
                id="max_discount"
                value={form.max_discount}
                onChange={handleChange}
                placeholder="Maksimal Discount"
                required
              />
            </div>
          </WrapForm>
          <WrapForm style={{ width: '45%' }}>
            <label>
              <Span>Payment Method </Span>
            </label>
            <Input
              as="select"
              name="payment_method"
              id="payment_method"
              value={form.payment_method}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              <option value="OVO">OVO</option>
              <option value="TRANSFER">Transfer</option>
              <option value="E-WALLET">E-wallet</option>
            </Input>
          </WrapForm>
        </div>

        <WrapForm>
          <label>
            <Span>Nilai Coupons (%)</Span>
          </label>
          <Input
            type="number"
            name="value"
            id="value"
            value={form.value}
            onChange={handleChange}
            required
          />
        </WrapForm>
        <WrapForm style={{ width: '45%' }}>
          <label>
            <input
              type="checkbox"
              name="is_active"
              id="is_active"
              value={form.is_active}
              onChange={handleCheckbox}
              checked={form.is_active}
              required
            />
            Click to active this coupons
          </label>
        </WrapForm>
        <ModalFooter>
          <Button
            color="white"
            style={{ border: '1px solid gray' }}
            onClick={props.toggle}
          >
            Cancel
          </Button>{' '}
          <Button color="primary" onClick={handleSubmit}>
            <div style={{ width: '100px', textAlign: 'center' }}>
              {state.isLoading ? (
                <Spinner style={{ width: '1.5rem', height: '1.5rem' }} />
              ) : (
                'Update'
              )}
            </div>
          </Button>{' '}
        </ModalFooter>
      </>
    );
  };

  // ---- Finish ----//

  const { id, toggle, coupons } = props;

  return (
    <section>
      <InputValue
        name={coupons.name}
        code={coupons.code}
        value={coupons.value}
        max_discount={coupons.max_discount}
        is_active={coupons.is_active}
        start_date={coupons.start_date}
        end_date={coupons.end_date}
        payment_method={coupons.payment_method}
        id={id}
        toggle={toggle}
      />
    </section>
  );
}

const Styles = {
  FlexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  PriceBorder: {
    display: 'flex',
    border: '1px solid #ced4da',
    borderRadius: '3px',
  },
  PriceRupiah: {
    backgroundColor: '#e9ecef',
    width: '50px',
  },
  PriceRp: {
    textAlign: 'center',
    marginTop: '10px',
  },
};
