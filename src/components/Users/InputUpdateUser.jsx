import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import {
  fetchGetShowUsers,
  fetchUpdateAdministrator,
  fetchGetRoles,
} from '../../store/actions';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'reactstrap';
import MultiSelect from '@khanacademy/react-multi-select';
import Styled from 'styled-components';

const WrapForm = Styled.div`
  width: 100%;
  margin-bottom: 18px;
`;
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: 0.9em;
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

export default function InputUpdateUser(props) {
  // ---Input value --- //
  const InputValue = (props) => {
    const { name, email, phone_number, id, role } = props;
    console.log(role, 'ISI ROLES');
    const dispatch = useDispatch();
    const [form, setForm] = useState({
      name: name || '',
      email: email || '',
      phone_number: phone_number || '',
      role: [],
      password: '',
    });
    console.log(form, 'form update');
    const [state, setState] = useState({
      isLoading: false,
    });

    const roles = useSelector((state) => state.roles.getRoles);
    const data = [{ key: 1, value: 'Loading', label: 'Loading...' }];
    const options =
      roles === null
        ? data.map((item) => {
            return {
              item: item.key,
              value: item.value,
              label: item.label,
              isDisabled: true,
            };
          })
        : roles.data.map((item) => {
            return { key: item._id, value: item._id, label: item.adminType };
          });

    // --- useEffect --- Get Data Roles ---//
    useEffect(() => {
      dispatch(fetchGetRoles());
    }, [dispatch]);

    const handleSubmit = (event) => {
      setState({
        isLoading: true,
      });
      dispatch(fetchUpdateAdministrator({ form, id, setState }));
    };

    const handleChange = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };

    const FilterReactSelect = (value) => {
      return (
        value !== null &&
        value.map((item) => {
          return { key: item._id, value: item._id, label: item.adminType };
        })
      );
    };

    const AddKeyValueToArray = (value) => {
      return value === undefined
        ? null
        : value.map((item) => {
            return item.key;
          });
    };

    const [value, setValue] = useState({
      roleId: FilterReactSelect(role) || [],
    });
    console.log({ value, form }, 'TEST');
    const handleChangeSelect = (roleId) => {
      setValue({ ...value, roleId });
    };
    form.role = AddKeyValueToArray(value.roleId) || [];
    return (
      <>
        <div>
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
                placeholder="Select roles..."
              />
            </div>
          </WrapForm>

          <WrapForm>
            <div>
              <Input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>
          </WrapForm>

          <WrapForm>
            <div>
              <Input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
          </WrapForm>

          <WrapForm>
            <>
              <Input
                type="password"
                name="password"
                id="password"
                defaultValue={form.password}
                onChange={handleChange}
                placeholder="password"
              />
            </>
          </WrapForm>
          <WrapForm>
            <>
              <Input
                type="number"
                name="phone_number"
                id="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </>
          </WrapForm>
        </div>
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
                '   Update'
              )}
            </div>
          </Button>{' '}
        </ModalFooter>
      </>
    );
  };

  // ---- Finish ----//

  const { id, toggle, users } = props;

  return (
    <section>
      <InputValue
        name={users.name}
        email={users.email}
        phone_number={users.phone_number}
        id={id}
        toggle={toggle}
        role={users.role}
      />
    </section>
  );
}
