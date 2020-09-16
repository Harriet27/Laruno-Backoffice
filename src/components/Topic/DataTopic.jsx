import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetTopic } from '../../store/actions';
import moment from 'moment';

// --- Styled Components --- //
const Th = Styled.th`
font-size:  ${(props) => (props.td ? '16px' : '20px')};
font-weight: ${(props) => (props.td ? 'normal' : '600')};
text-align: center;
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
        <Card isNormal>
            <Table borderless>
                <thead>
                    <tr>
                        <Th>Name</Th>
                        <Th>Slug</Th>
                        <Th>Created At</Th>
                        <Th>Updated At</Th>
                        <Th>Id</Th>
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
                                        {item._id}
                                    </Th>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        </Card>
    );
};

export default DataTopic;
