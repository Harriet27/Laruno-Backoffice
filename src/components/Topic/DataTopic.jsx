import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetTopic, fetchMultipleDeleteTopics } from '../../store/actions';
import DeleteIcon from '@material-ui/icons/Delete';
import DehazeIcon from '@material-ui/icons/Dehaze';
import moment from 'moment';
import { Input, Th, sm, md, lg } from '../../elements/Styled/StyledForm';

// --- Elements, Pages, Components --- //
import AddNewTopic from './AddNewTopic';
import UpdateTopic from './UpdateTopic';
import DeleteTopic from './DeleteTopic';
import Card from '../../elements/Card/Card';

// --- Styled Components --- //

const SectionOne = Styled.div`
    margin: ${lg} 0;
    display: flex;
    justify-content: space-between;
`;
// --- Batas --- //

const DataTopic = (props) => {
    const dispatch = useDispatch();
    const topic = useSelector((state) => state.topic.getTopic);
    console.log(topic);

    // --- useEffect --- Get Data topic ---//
    useEffect(() => {
        dispatch(fetchGetTopic());
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
        dispatch(fetchMultipleDeleteTopics(form));
    };
    return (
        <React.Fragment>
            {/* --- section 1 --- Add New Topic and Search Topic --- */}
            <SectionOne>
                <AddNewTopic />
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
                                <div>
                                    {form.id[0] ? (
                                        <div onClick={handlleMultipleDelete}>
                                            <DeleteIcon color="error" />
                                        </div>
                                    ) : (
                                        <DehazeIcon />
                                    )}
                                </div>
                            </Th>
                            <Th>Name</Th>
                            <Th>Slug</Th>
                            <Th>Created At</Th>
                            <Th>Updated At</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {topic !== null &&
                            topic.data.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <Th>
                                            <Input
                                                checkbox
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
                                            {item.slug}
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
                                                <UpdateTopic id={item._id} />
                                                <DeleteTopic id={item._id} />
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

export default DataTopic;
