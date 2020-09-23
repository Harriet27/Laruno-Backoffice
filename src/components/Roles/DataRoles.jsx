import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetRoles } from '../../store/actions';
import moment from 'moment';

// --- Elements, Pages, Components --- //
import AddRoles from './AddRoles';

import Card from '../../elements/Card/Card';
import DeleteRoles from './DeleteRoles';

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

const DataRoles = (props) => {
    const dispatch = useDispatch();
    const roles = useSelector((state) => state.roles.getRoles);
    console.log(roles, 'KELUARKAN ISINYA');

    // --- useEffect --- Get Data topic ---//
    useEffect(() => {
        dispatch(fetchGetRoles());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* --- section 1 --- Add New Topic and Search Topic --- */}
            <SectionOne>
                <AddRoles />
                <div>
                    <label>Search</label> <Input type="search" />
                </div>
            </SectionOne>

            {/* --- section 2 --- Table Get Data Product In Table --- */}
            <Card isNormal>
                <Table striped>
                    <thead>
                        <tr>
                            <Th>Admin Type</Th>
                            <Th>Read Write</Th>
                            <Th>Created At</Th>
                            <Th>Updated At</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles !== null &&
                            roles.data.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <Th as="td" td>
                                            {item.adminType}
                                        </Th>
                                        <Th as="td" td>
                                            {item.readWrite === false ? (
                                                <p>False</p>
                                            ) : (
                                                <p>True</p>
                                            )}
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
                                                {/* <UpdateTopic id={item._id} /> */}
                                                <DeleteRoles id={item._id} />
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

export default DataRoles;
