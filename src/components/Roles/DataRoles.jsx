import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetRoles, fetchMultipleDeleteRoles } from '../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import DehazeIcon from '@material-ui/icons/Dehaze';
import moment from 'moment';
import { Input, Th, sm, md, lg } from '../../elements/Styled/StyledForm';

// --- Elements, Pages, Components --- //
import AddRoles from './AddRoles';

import Card from '../../elements/Card/Card';
import DeleteRoles from './DeleteRoles';

// --- Styled Components --- //

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
