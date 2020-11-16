import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostCoupons, fetchGetPaymentsMethod } from '../../store/actions';

// --- Elements, Pages, Components --- //
import ModalSmart from '../../elements/Modal/ModalSmart';

// --- Validation --- //
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddCouponsSchema } from '../../elements/Validation';
import { SpanErrosMessage } from '../../elements/Styled/StyledForm';

// --- Styled Components --- //
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

export default function AddCoupons() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    code: '',
    value: '',
    start_date: '',
    end_date: '',
    max_discount: 0,
    payment_method: '',
    is_active: false,
  });

  const payment = useSelector((state) => state.payment.getPaymentsMethod);
  console.log(payment, 'payments');
  useEffect(() => {
    dispatch(fetchGetPaymentsMethod());
    // eslint-disable-next-line
  }, [dispatch]);

  // --- Fetch submit method Post --- //
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddCouponsSchema),
  });
  const onSubmit = async (event) => {
    dispatch(fetchPostCoupons(form));
  };
  // --- Change Value when Input Active --- //
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleCheckbox = () => {
    setForm({ ...form, is_active: !form.is_active });
  };
  return (
    <ModalSmart
      styleModal={{ maxWidth: '700px', width: '100%' }}
      buttonLabel="Add Coupons"
      title="Add Coupons"
      onClickConfirm={handleSubmit(onSubmit)}
    >
      <div style={Styles.FlexBetween}>
        <WrapForm>
          <label>
            <Span>Name</Span>
          </label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={form.name}
            onChange={handleChange}
            placeholder="Name Coupons"
            ref={register}
          />
          <>
            <SpanErrosMessage>{errors.name?.message}</SpanErrosMessage>
          </>
        </WrapForm>

        <WrapForm>
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

      <div style={Styles.FlexBetween}>
        <WrapForm>
          <label>
            <Span>Start Coupons</Span>
          </label>
          <Input
            type="date"
            name="start_date"
            id="start_date"
            defaultValue={form.start_date}
            onChange={handleChange}
            placeholder="Start Date"
            ref={register}
          />
          <>
            <SpanErrosMessage>{errors.start_date?.message}</SpanErrosMessage>
          </>
        </WrapForm>

        <WrapForm>
          <label>
            <Span>End Coupons</Span>
          </label>
          <Input
            type="date"
            name="end_date"
            id="end_date"
            defaultValue={form.end_date}
            onChange={handleChange}
            placeholder="End Date"
            ref={register}
          />
          <>
            <SpanErrosMessage>{errors.end_date?.message}</SpanErrosMessage>
          </>
        </WrapForm>
      </div>
      <div style={Styles.FlexBetween}>
        <WrapForm>
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
            <Span>Payment Method</Span>
          </label>
          <Input
            as="select"
            name="payment_method"
            id="payment_method"
            defaultValue={form.payment_method}
            onChange={handleChange}
            ref={register}
          >
            <option value="" disabled hidden>
              Choose here
            </option>
            {payment == null ? (
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
          <>
            <SpanErrosMessage>
              {errors.payment_method?.message}
            </SpanErrosMessage>
          </>
        </WrapForm>
      </div>

      <WrapForm isFull>
        <label>
          <Span>Nilai Coupons (%)</Span>
        </label>
        <Input
          type="number"
          name="value"
          id="value"
          defaultValue={form.value}
          onChange={handleChange}
          ref={register}
        />
        <>
          <SpanErrosMessage>{errors.value?.message}</SpanErrosMessage>
        </>
      </WrapForm>
      <WrapForm>
        <label>
          <input
            type="checkbox"
            name="is_active"
            id="is_active"
            value={form.is_active}
            onChange={handleCheckbox}
            required
          />
          Click to active this coupons
        </label>
      </WrapForm>
    </ModalSmart>
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
