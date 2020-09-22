// --- Khusus Super Admin --- //

import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUsersAdministrator } from '../../store/actions';
import moment from 'moment';

// --- Elements, Pages, Components --- //
import AddAdministrator from './AddAdministrator';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

import Card from '../../elements/Card/Card';

// --- Styled Components --- //
const Th = Styled.th`
    font-size:  ${(props) => (props.td ? '16px' : '20px')};
    font-weight: ${(props) => (props.td ? 'normal' : '600')};
    text-align: left;
`;
const Input = Styled.input`
    padding: .375rem;
    font-size: 14px;
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
const SectionOne = Styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
`;
// --- Batas --- //

const DataUsers = (props) => {
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.user.userAdministrator);
    console.log(admin, 'ini data users admin');
    // --- useEffect --- Get Data topic ---//
    useEffect(() => {
        dispatch(fetchGetUsersAdministrator());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* --- section 1 --- Add New Topic and Search Topic --- */}
            <SectionOne>
                <AddAdministrator />
                <div>
                    <label>Search</label> <Input type="search" />
                </div>
            </SectionOne>

            {/* --- section 2 --- Table Get Data Product In Table --- */}
            <Card isNormal>
                <Table striped>
                    <thead>
                        <tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Phone Number</Th>
                            <Th>Created At</Th>
                            <Th>Updated At</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {admin !== null &&
                            admin.data.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <Th as="td" td>
                                            {item.name}
                                        </Th>
                                        <Th as="td" td>
                                            {item.email}
                                        </Th>
                                        <Th as="td" td>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                {item.role.map((id) => {
                                                    return (
                                                        <p key={id._id}>
                                                            {id.adminType}{' '}
                                                            &nbsp;
                                                        </p>
                                                    );
                                                })}
                                            </div>
                                        </Th>
                                        <Th as="td" td>
                                            {item.phone_number}
                                        </Th>
                                        <Th as="td" td>
                                            {moment(item.created_at).format(
                                                'MMMM Do YYYY, h:mm:ss a'
                                            )}
                                        </Th>
                                        <Th as="td" td>
                                            {moment(item.updated_at).format(
                                                'MMMM Do YYYY, h:mm:ss a'
                                            )}
                                        </Th>
                                        <Th as="td" td>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <UpdateUser id={item._id} />
                                                <DeleteUser id={item._id} />
                                            </div>
                                        </Th>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </Card>
        </React.Fragment>
    );
};

export default DataUsers;
