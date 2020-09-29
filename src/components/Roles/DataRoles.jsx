import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetRoles, fetchMultipleDeleteRoles } from '../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import DehazeIcon from '@material-ui/icons/Dehaze';
import moment from 'moment';

// --- Elements, Pages, Components --- //
import AddRoles from './AddRoles';

import Card from '../../elements/Card/Card';
import DeleteRoles from './DeleteRoles';

// --- Styled Components --- //
const [sm, md, lg] = ['16px', '18px', '20px'];

const Th = Styled.th`
    font-size:  ${(props) => (props.td ? `${sm}` : `${md}`)};
    font-weight: ${(props) => (props.td ? 'normal' : '600')};
    text-align: left;
`;
const Input = Styled.input`
    padding: .375rem;
    font-size: ${sm};
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
    margin: ${lg} 0;
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
        dispatch(fetchMultipleDeleteRoles(form));
    };
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
