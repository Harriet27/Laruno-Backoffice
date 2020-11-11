import React, { useState } from 'react';
import Styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchPostTopic, fetchPostSingleImage } from '../../store/actions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddTopicSchema } from '../../elements/Validation';
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
const Span = Styled.span`
color: #c7254e;
background-color: #f9f2f4;
`;

export default function AddTemplateFollowUp() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    template: '',
  });

  // --- Fetch submit method Post --- //

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(fetchPostTopic(form));
  };

  // --- Change Value when Input Active --- //
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <ModalSmart
      styleModal={{ maxWidth: '1000px' }}
      buttonLabel="Add New"
      title="Add New Follow Up"
      onClickConfirm={onSubmit}
    >
      <Card style={Styles.Card}>
        <WrapForm>
          <label>Name</label>
          <Input
            type="text"
            name="name"
            id="name"
            defaultValue={form.name}
            onChange={handleChange}
          />
        </WrapForm>
        <WrapForm>
          <label>Template</label>
          <Input
            as="textarea"
            rows="5"
            name="name"
            id="name"
            defaultValue={form.template}
            onChange={handleChange}
          />
        </WrapForm>
        <WrapForm>Note untuk membuat Template WA</WrapForm>

        <div>
          <div>
            <Span>[nama]</Span> :Nama Costumer
          </div>
          <div>
            <Span>[phone_number]</Span> :Nomor telephone Costumer
          </div>
          <div>
            <Span>[name_product]</Span> :Nama Product
          </div>
          <div>
            <Span>[payment_method]</Span> :Nama metode pembayaran
          </div>
        </div>
      </Card>
    </ModalSmart>
  );
}

const Styles = {
  Card: { fontWeight: '600', color: 'rgba(0,0,0,.6)' },
};
