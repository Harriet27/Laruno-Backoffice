import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetReseller } from '../../store/actions';

// --- Elements, Pages, Components --- //

// import AddNewTopic from './AddNewTopic';
// import UpdateTopic from './UpdateTopic';
// import DeleteTopic from './DeleteTopic';
import Card from '../../elements/Card/Card';

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

const DataTopic = (props) => {
    const dispatch = useDispatch();
    const reseller = useSelector((state) => state.reseller.getReseller);
    console.log(reseller, 'ini resseler isinya  what?');

    // --- useEffect --- Get Data topic ---//
    useEffect(() => {
        dispatch(fetchGetReseller());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* --- section 1 --- Add New Topic and Search Topic --- */}
            <SectionOne>
                {/* <AddNewTopic /> */}
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
                        {reseller !== null &&
                            reseller.data.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <Th as="td" td>
                                            {item.name}
                                        </Th>
                                        <Th as="td" td>
                                            {/* {item.slug} */}
                                        </Th>
                                        {/* <Th as="td" td>
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
                                        </Th> */}
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
