import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchGetShowUsers,
    fetchUpdateAdministrator,
    fetchGetRoles,
} from '../../store/actions';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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
        const { name, email, phone_number, id } = props;
        const dispatch = useDispatch();
        const [form, setForm] = useState({
            name: name || '',
            email: email || '',
            phone_number: phone_number || '',
            role: '',
            password: '',
        });
        console.log(form, 'form');

        const roles = useSelector((state) => state.roles.getRoles);
        let optionsRoles =
            roles !== null &&
            roles.data.map((item) => {
                return {
                    key: item._id,
                    value: item._id,
                    label: item.adminType,
                };
            });
        // --- useEffect --- Get Data Roles ---//
        useEffect(() => {
            dispatch(fetchGetRoles());
        }, [dispatch]);

        const handleSubmit = (event) => {
            event.preventDefault();
            dispatch(fetchUpdateAdministrator(form, id));
        };
        const handleSelect = (role) => {
            setForm({ ...form, role });
        };
        const handleChange = (event) => {
            setForm({ ...form, [event.target.name]: event.target.value });
        };

        return (
            <>
                <div>
                    <WrapForm>
                        <div>
                            <MultiSelect
                                overrideStrings={{
                                    selectSomeItems: 'select role...',
                                    allItemsAreSelected: 'Semua role dipilih',
                                    selectAll: 'Select All',
                                    search: 'Search',
                                }}
                                options={optionsRoles}
                                selected={form.role}
                                onSelectedChanged={handleSelect}
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
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
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
                        Update
                    </Button>{' '}
                </ModalFooter>
            </>
        );
    };

    // ---- Finish ----//
    const dispatch = useDispatch();
    const { id, toggle } = props;
    const users = useSelector((state) => state.user.showUsers);
    console.log(users, 'update tpic by id');

    useEffect(() => {
        dispatch(fetchGetShowUsers(id));
        // eslint-disable-next-line
    }, [dispatch]);

    return (
        <section>
            <InputValue
                name={users === null ? 'Loading...' : users.data.name}
                email={users === null ? 'Loading...' : users.data.email}
                phone_number={
                    users === null ? 'Loading' : users.data.phone_number
                }
                id={id}
                toggle={toggle}
            />
        </section>
    );
}
