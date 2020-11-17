import React, { useState } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPostLogin } from '../../store/actions';
import Card from '../../elements/Card/Card';
import ImageBrand from '../../assets/images/laruno1.png';
import { Spinner } from 'reactstrap';

// --- React hook form test --- //
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from '../../elements/Validation';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    height: 100vh;
    align-items: center;
    display: flex;
    justify-content: center; 
`;
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: 18px;
    font-weight: 400;
    color:${(props) => (props.button ? 'white' : '#495057')} ;
    border-radius: 3px;
    background-color:${(props) => (props.button ? '#0098DA' : '#FCFCFC')} ;
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const Brand = Styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;
const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: 20px;
`;
const Image = Styled.img`
    width: ${(props) => (props.div ? '100%' : null)};
    height: ${(props) => (props.image ? '100%' : null)}
`;
// --- Styled Components --- //

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  console.log(form, 'form login');
  const [state, setState] = useState({
    isLogin: false,
  });
  // react hook form
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  // --- Fetch submit method Post --- //
  // const handleSubmit = async (event) => {};
  const onSubmit = (event) => {
    // event.preventDefault();
    setState({
      isLogin: true,
    });
    dispatch(fetchPostLogin({ form, history, setState }));
  };
  // --- Change Value when Input --- //
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Section>
      <Card isLogin>
        <Brand>
          <Image as="div" div>
            <Image image src={ImageBrand} alt="brand" />
          </Image>
        </Brand>
        <form onSubmit={handleSubmit(onSubmit)}>
          <WrapForm>
            <Input
              type="email"
              name="email"
              id="email"
              defaultValue={form.email}
              onChange={handleChange}
              placeholder="Email"
              ref={register}
            />
            <span
              style={{
                color: 'red',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {errors.email?.message}
            </span>
          </WrapForm>

          <WrapForm>
            <Input
              type="password"
              name="password"
              id="password"
              defaultValue={form.password}
              onChange={handleChange}
              placeholder="Password"
              ref={register}
            />
            <span
              style={{
                color: 'red',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {errors.password?.message}
            </span>
          </WrapForm>
          {state.isLogin ? (
            <Input
              disabled
              style={{ cursor: 'not-allowed' }}
              as="button"
              button
            >
              <Spinner style={{ width: '1.5rem', height: '1.5rem' }} />
            </Input>
          ) : (
            <Input as="button" button>
              Login
            </Input>
          )}
        </form>
      </Card>
    </Section>
  );
}
