import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostAdministrator, fetchGetRoles } from '../../store/actions';
import Card from '../../elements/Card/Card';
import ModalSmart from '../../elements/Modal/ModalSmart';
import MultiSelect from '@khanacademy/react-multi-select';

// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    
    
`;
const Input = Styled.input`
    width: 100%;
    padding: 10px;
    font-size: 18px;
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
    margin-bottom: 20px;
`;
const WrapForm = Styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const Label = Styled.label`
    
`;
const WrapsField = Styled.div`
    margin-bottom: 25px;
    width: ${(props) => (props.dividedByTwo ? '45%' : null)}
`;
const Span = Styled.span`
    font-weight: bold;
    color: #656565;
    font-size: 18px;
`;

export default function AddAdministrator() {
    const dispatch = useDispatch();
    const history = useHistory();

    const roles = useSelector((state) => state.roles.getRoles);
    console.log(roles, 'KELUARKAN ISINYA');

    // --- useEffect --- Get Data topic ---//
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
    console.log(form, 'testing form');
    // --- Fetch submit method Post --- //
    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(fetchPostAdministrator(form, history));
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
    let optionsRoles =
        roles !== null &&
        roles.data.map((item) => {
            return { key: item._id, value: item._id, label: item.adminType };
        });

    return (
        <div style={{ width: '150px' }}>
            <ModalSmart
                onClickConfirm={handleSubmit}
                buttonLabel="Create Admin"
                title="Create Admin"
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
                                Add Administrator
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
