import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetTopic } from '../../store/actions';
import moment from 'moment';

import AddNewTopic from './AddNewTopic';
import UpdateTopic from './UpdateTopic';
import DeleteTopic from './DeleteTopic';
import ShowTopic from './ShowTopic';
// --- Styled Components --- //
const Th = Styled.th`
    font-size:  ${(props) => (props.td ? '16px' : '20px')};
    font-weight: ${(props) => (props.td ? 'normal' : '600')};
    text-align: center;
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
// --- Styled Components --- //

const DataTopic = (props) => {
    const dispatch = useDispatch();
    const topic = useSelector((state) => state.topic);
    console.log(topic, 'data topic for pages topic');
    // --- useEffect --- get data topic ---//
    useEffect(() => {
        dispatch(fetchGetTopic());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* section 1 */}
            <div
                style={{
                    margin: '20px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <AddNewTopic />
                <div>
                    <label>Search</label> <Input type="search" />
                </div>
            </div>

            {/* section 2 */}
            <Card isNormal>
                <Table borderless>
                    <thead>
                        <tr>
                            <Th>Name</Th>
                            <Th>Slug</Th>
                            <Th>Created At</Th>
                            <Th>Updated At</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {topic.data !== undefined &&
                            topic.data.map((item) => {
                                return (
                                    <tr key={item._id}>
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
                                            <div>
                                                <UpdateTopic id={item._id} />
                                                <DeleteTopic id={item._id} />
                                                {/* <ShowTopic id={item._id} /> */}
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
