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

export default function AddNewTopic() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    icon: '',
  });
  const [formulir, setFormulir] = useState({
    image: {},
  });

  const [state, setState] = useState({
    isLoading: false,
    isPost: false,
  });
  form.icon = formulir.image.icon;
  // --- Fetch submit method Post --- //

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddTopicSchema),
  });

  const onSubmit = async (event) => {
    setState({
      isPost: true,
    });
    dispatch(fetchPostTopic(form, setState));
  };

  // --- Change Value when Input Active --- //
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // --- HandleChange upload Image --- //
  const handleChangeImage = (e, id) => {
    let image = formulir.image;
    let field = e.target.id;
    image[field] = e.target.files[0];
    setFormulir({ image });
    setState({
      isLoading: true,
    });
    dispatch(fetchPostSingleImage({ formulir, e, id, setFormulir, setState }));
    e.target.type = 'text';
    e.target.type = 'file';
  };

  return (
    <ModalSmart
      buttonLabel={
        <div style={{ width: '65px', textAlign: 'center' }}>+ Topic</div>
      }
      title="Add Topic"
      onClickConfirm={handleSubmit(onSubmit)}
      isLoading={state.isPost}
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
          <SingleImage
            id="icon"
            onChange={(e) => handleChangeImage(e, 'icon')}
            isLoading={state.isLoading}
          />
          {typeof formulir.image.icon === 'object' ? null : (
            <div style={{ width: '125px' }}>
              <img
                width="100%"
                src={formulir.image.icon}
                alt={formulir.image.icon}
              />
            </div>
          )}
        </WrapForm>
      </Card>
    </ModalSmart>
  );
}
