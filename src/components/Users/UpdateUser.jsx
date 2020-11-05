import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import MultiSelect from '@khanacademy/react-multi-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUpdateAdministrator, fetchGetRoles } from '../../store/actions';
import CreateIcon from '@material-ui/icons/Create';
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';

// --- Styled Components --- //
const [sm, md, lg] = ['16px', '18px', '20px'];

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

export default function UpdateUser(props) {
    const dispatch = useDispatch();

    // --- useEffect --- Get Data Roles ---//
    useEffect(() => {
        dispatch(fetchGetRoles());
        // eslint-disable-next-line
    }, [dispatch]);

    // --- Roles --- //
    const roles = useSelector((state) => state.roles.getRoles);

    const [form, setForm] = useState({
        name: '',
        email: '',
        role: [],
        password: '',
        phone_number: '',
    });

    // --- Fetch submit method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchUpdateAdministrator(form, props.id));
    };

    // --- merubah value setiap kali di ketik --- //
    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    // Handle select
    const handleSelect = (role) => {
        setForm({ ...form, role });
    };

    // value Roles get data roles
    let optionsRoles =
        roles !== null &&
        roles.data.map((item) => {
            return { key: item._id, value: item._id, label: item.adminType };
        });
    return (
        <div>
            <ModalSmart
                onClickConfirm={handleSubmit}
                buttonLabel={<CreateIcon fontSize="small" />}
                title="Update Admin"
            >
                <Section>
                    <Card
                        isNormal
                        style={{
                            padding: '50px',
                            width: '500px',
                            borderRadius: '5px',
                        }}
                    >
                        <Brand>
                            <div style={{ width: '100%' }}>
                                Update Administrator
                            </div>
                        </Brand>
                        <form>
                            <WrapForm>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required
                                />
                            </WrapForm>

                            <WrapForm>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                            </WrapForm>

                            <WrapForm>
                                <div>
                                    <MultiSelect
                                        overrideStrings={{
                                            selectSomeItems: 'select role...',
                                            allItemsAreSelected:
                                                'Semua role dipilih',
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
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                            </WrapForm>
                            <WrapForm>
                                <Input
                                    type="number"
                                    name="phone_number"
                                    id="phone_number"
                                    value={form.phone_number}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                />
                            </WrapForm>
                        </form>
                    </Card>
                </Section>
            </ModalSmart>
        </div>
    );
}
