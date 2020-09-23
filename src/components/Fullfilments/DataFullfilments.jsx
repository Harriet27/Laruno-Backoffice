import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFulFillments } from '../../store/actions';
import moment from 'moment';

// --- Elements, Pages, Components --- //
// import AddNewFulfillments from './AddNewFulfillments';
// import UpdateFulfillments from './UpdateFulfillments';
// import DeleteFulfillments from './DeleteFulfillments';
import Card from '../../elements/Card/Card';

// --- Styled Components --- //
const Th = Styled.th`
    font-size:  ${(props) => (props.td ? '16px' : '18px')};
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

const DataFulfillments = (props) => {
    const dispatch = useDispatch();
    const fulfillments = useSelector(
        (state) => state.fulfillments.getFulFillments
    );

    console.log(fulfillments, 'ini data fulfillments');
    // --- useEffect --- Get Data fulfillments ---//
    useEffect(() => {
        dispatch(fetchGetFulFillments());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* --- section 1 --- Add New Fulfillments and Search Fulfillments --- */}
            <SectionOne>
                {/* <AddNewFulfillments /> */}
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
                            <Th>Slug</Th>
                            <Th>Created At</Th>
                            <Th>Updated At</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {fulfillments !== null &&
                            fulfillments.data.map((item) => {
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
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            > */}
                        {/* <UpdateFulfillments
                                                    id={item._id}
                                                />
                                                <DeleteFulfillments
                                                    id={item._id}
                                                /> */}
                        {/* </div>
                                        </Th>
                                    </tr>
                                );
                            })} */}
                    </tbody>
                </Table>
            </Card>
        </React.Fragment>
    );
};

export default DataFulfillments;
