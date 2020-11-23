import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, StylesProvider } from '@material-ui/core';
import moment from 'moment';
import {
  fetchShowTopic,
  fetchUpdateTopic,
  fetchPostSingleImage,
  fetchShowCoupons,
  fetchGetProduct,
  fetchGetPaymentsMethod,
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
    width:  ${(props) => (props.isFull ? '100%' : '45%')};
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
      product_id,
      type,
      product,
      payment,
    } = props;
    const dispatch = useDispatch();

    // const payment = useSelector((state) => state.payment.getPaymentsMethod);
    // const product = useSelector((state) => state.product.getProduct);
    // console.log({ payment, product }, 'PPPPayments');
    // useEffect(() => {
    //   dispatch(fetchGetPaymentsMethod());
    //   dispatch(fetchGetProduct());
    //   // eslint-disable-next-line
    // }, [dispatch]);

    const [form, setForm] = useState({
      name: name || '',
      type: type || '',
      product_id: product_id || '',
      value: value || '',
      start_date: moment(start_date).format('YYYY-MM-DD') || '',
      end_date: moment(end_date).format('YYYY-MM-DD') || '',
      max_discount: max_discount || 0,
      payment_method: payment_method || '',
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
              <Span>Value Coupons (%)</Span>
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
          <WrapForm>
            <label>
              <Span>Type</Span>
            </label>
            <Input
              as="select"
              name="type"
              id="type"
              value={form.type}
              onChange={handleChange}
              // ref={register}
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              <option value="Product">Product</option>
              <option value="Payment">Payment</option>
              <option value="User">User</option>
              <option value="Event">Event</option>
            </Input>
          </WrapForm>
        </div>
        <>
          {form.type === 'Payment' ? (
            <WrapForm isFull>
              <label>
                <Span>Payment Method</Span>
              </label>
              <Input
                as="select"
                name="payment_method"
                id="payment_method"
                value={form.payment_method}
                onChange={handleChange}
                // ref={register}
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
                {payment === null ? (
                  <option value="OVO">Loading...</option>
                ) : (
                  payment.data.map((item) => {
                    return (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })
                )}
              </Input>
            </WrapForm>
          ) : form.type === 'Product' ? (
            <WrapForm isFull>
              <label>
                <Span>Product</Span>
              </label>
              <Input
                as="select"
                name="product_id"
                id="payment_method"
                value={form.product_id}
                onChange={handleChange}
                // ref={register}
              >
                <option value="" disabled hidden>
                  Choose here
                </option>
                {product === null ? (
                  <option disabled value="null">
                    Loading...
                  </option>
                ) : (
                  product.data.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    );
                  })
                )}
              </Input>
            </WrapForm>
          ) : null}
        </>

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
          </Button>
        </ModalFooter>
      </>
    );
  };

  // ---- Finish ----//

  const { id, toggle, coupons, product, payment } = props;

  return (
    <section>
      <InputValue
        name={coupons.name}
        code={coupons.code}
        value={coupons.value}
        max_discount={coupons.max_discount}
        // is_active={coupons.is_active}
        type={coupons.type}
        start_date={coupons.start_date}
        end_date={coupons.end_date}
        payment_method={
          coupons.payment_method !== null && coupons.payment_method
        }
        product_id={coupons.product_id !== null && coupons.product_id}
        id={id}
        toggle={toggle}
        product={product}
        payment={payment}
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
