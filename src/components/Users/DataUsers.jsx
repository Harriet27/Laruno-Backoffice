// --- Khusus Super Admin --- //
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchGetUsersAdministrator,
    fetchMultipleDeleteUsers,
} from '../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import DehazeIcon from '@material-ui/icons/Dehaze';
import moment from 'moment';
import { Input, Th, sm, md, lg } from '../../elements/Styled/StyledForm';

// --- Elements, Pages, Components --- //
import AddAdministrator from './AddAdministrator';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

import Card from '../../elements/Card/Card';

// --- Styled Components --- //

const SectionOne = Styled.div`
    margin: ${lg} 0;
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

    // --- For Multiple Delete --- //
    const [form, setForm] = useState({
        id: [],
    });

    // --- handleCheckboxChange --- //
    const handleCheckboxChange = (event) => {
        let newArray = [...form.id, event.target.id];
        if (form.id.includes(event.target.id)) {
            newArray = newArray.filter((item) => item !== event.target.id);
        }
        setForm({
            id: newArray,
        });
    };

    // --- Multiple Delete --- //
    const handlleMultipleDelete = (event) => {
        event.preventDefault();
        dispatch(fetchMultipleDeleteUsers(form));
    };
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
                            <Th>
                                {/* --- Logic untuk multiple delete --- */}
                                {form.id[0] ? (
                                    <div onClick={handlleMultipleDelete}>
                                        <DeleteIcon color="error" />
                                    </div>
                                ) : (
                                    <DehazeIcon />
                                )}
                            </Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Phone</Th>
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
                                        <Th>
                                            <input
                                                style={{
                                                    marginLeft: '9px',
                                                }}
                                                type="checkbox"
                                                id={item._id}
                                                value={item._id}
                                                onChange={handleCheckboxChange}
                                            />
                                        </Th>
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
