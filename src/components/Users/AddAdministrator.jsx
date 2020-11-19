import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostAdministrator, fetchGetRoles } from '../../store/actions';
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import Select from 'react-select';
// --- Validation --- //
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddAdministratorSchema } from '../../elements/Validation';
import { SpanErrosMessage } from '../../elements/Styled/StyledForm';

// --- Styled Components --- //
const [md, lg] = ['18px', '20px'];

const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: ${md};
    font-weight: 400;
    color: #495057;
    border-radius: 3px;
    background-color: #FCFCFC;
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const Brand = Styled.h1`
    text-align: center;
    margin-bottom: ${lg};
`;
const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: ${lg};
`;

export default function AddAdministrator() {
  const dispatch = useDispatch();
  const history = useHistory();

  const roles = useSelector((state) => state.roles.getRoles);

  // --- useEffect --- Get Data Roles ---//
  useEffect(() => {
    dispatch(fetchGetRoles());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: [],
    password: '',
    phone_number: '',
  });
  console.log(form, 'form');
  const [state, setState] = useState({
    isLoading: false,
  });
  // --- Fetch submit method Post --- //

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddAdministratorSchema),
  });

  const onSubmit = () => {
    setState({
      isLoading: true,
    });
    dispatch(fetchPostAdministrator({ form, history, setState }));
  };

  // --- merubah value setiap kali di ketik --- //
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // Handle select
  const handleSelect = (role) => {
    setForm({ ...form, role });
  };

  // --- optionsTopic for value select topic --- //
  const options =
    roles === null
      ? { key: '123', value: 'chocolate', label: 'Chocolate' }
      : roles.data.map((item) => {
          return { key: item._id, value: item._id, label: item.adminType };
        });
  const [value, setValue] = useState({
    roleId: [],
  });
  console.log({ value, form }, 'TEST');
  const handleChangeSelect = (roleId) => {
    const isRoleId =
      roleId !== null &&
      roleId.map((item) => {
        return item.key;
      });
    setValue({ ...value, roleId });
    form.role = isRoleId || '';
  };

  return (
    <div style={{ width: '150px' }}>
      <ModalSmart
        onClickConfirm={handleSubmit(onSubmit)}
        buttonLabel={
          <div style={{ width: '65px', textAlign: 'center' }}>+ Admin</div>
        }
        title="Add Administrator"
        isLoading={state.isLoading}
      >
        <form>
          <WrapForm>
            <div>
              <Select
                isMulti
                name="colors"
                value={value.roleId || ''}
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChangeSelect}
              />
            </div>
          </WrapForm>

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
            <>
              <SpanErrosMessage>{errors.name?.message}</SpanErrosMessage>
            </>
          </WrapForm>

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
            <>
              <SpanErrosMessage>{errors.email?.message}</SpanErrosMessage>
            </>
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
            <>
              <SpanErrosMessage>{errors.password?.message}</SpanErrosMessage>
            </>
          </WrapForm>
          <WrapForm>
            <Input
              type="number"
              name="phone_number"
              id="phone_number"
              defaultValue={form.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
              ref={register}
            />
            <>
              <SpanErrosMessage>
                {errors.phone_number?.message}
              </SpanErrosMessage>
            </>
          </WrapForm>
        </form>
        {/* </Card> */}
        {/* </Section> */}
      </ModalSmart>
    </div>
  );
}
