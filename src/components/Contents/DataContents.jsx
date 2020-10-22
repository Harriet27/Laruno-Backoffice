import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetContents } from '../../store/actions';
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

const DataContents = (props) => {
    const dispatch = useDispatch();
    const contents = useSelector((state) => state.contents.getContents);

    // --- useEffect --- Get Data contents ---//
    useEffect(() => {
        dispatch(fetchGetContents());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* --- section 1 --- Add New Fulfillments and Search Fulfillments --- */}
            <SectionOne>
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
                    <tbody></tbody>
                </Table>
            </Card>
        </React.Fragment>
    );
};

export default DataContents;
