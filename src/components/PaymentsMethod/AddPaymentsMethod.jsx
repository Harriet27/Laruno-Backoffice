import React, { useState } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchPostPaymentsMethod } from '../../store/actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddPaymentMethodSchema } from '../../elements/Validation';
import { SpanErrosMessage } from '../../elements/Styled/StyledForm';

// --- Elements, Pages, Components --- //
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import SingleImage from '../AddProduct/SingleImage';

// --- Styled Components --- //
const [md, lg] = ['16px', '18px', '20px'];

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

export default function AddPaymentsMethod() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    info: '',
  });

  const [state, setState] = useState({
    isLoading: false,
  });
  // --- Fetch submit method Post --- //
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddPaymentMethodSchema),
  });

  const onSubmit = async (event) => {
    setState({
      isLoading: true,
    });
    dispatch(fetchPostPaymentsMethod(form, setState));
  };
  // --- Change Value when Input Active --- //
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <ModalSmart
      isLoading={state.isLoading}
      buttonLabel="Add Payments"
      title="Add Payments Method"
      onClickConfirm={handleSubmit(onSubmit)}
    >
      <Card>
        <WrapForm>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={form.name}
            onChange={handleChange}
            placeholder="Name"
            ref={register}
          />
          <div>
            <SpanErrosMessage>{errors.name?.message}</SpanErrosMessage>
          </div>
        </WrapForm>
        <WrapForm>
          <Input
            type="text"
            name="info"
            id="info"
            value={form.info}
            onChange={handleChange}
            placeholder="Info"
            ref={register}
          />
        </WrapForm>
      </Card>
    </ModalSmart>
  );
}
