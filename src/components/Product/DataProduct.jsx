import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProduct } from '../../store/actions';
import moment from 'moment';

// import AddNewTopic from './AddNewTopic';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';
import ShowProduct from './ShowProduct';
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
// --- Styled Components --- //

const DataProduct = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    console.log(product, 'data product for pages product');
    // --- useEffect --- get data topic ---//
    useEffect(() => {
        dispatch(fetchGetProduct());
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
                {/* <AddNewTopic /> */}
                <div>
                    <label>Search</label> <Input type="search" />
                </div>
            </div>

            {/* section 2 */}
            <Card isNormal>
                <Table striped>
                    <thead>
                        <tr>
                            <Th>Visibility</Th>
                            <Th>Product Code</Th>
                            <Th>Name</Th>
                            <Th>Product Type</Th>
                            <Th>Time Period</Th>
                            <Th>Price</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.data !== undefined &&
                            product.data.map((item) => {
                                return (
                                    <tr key={item._id}>
                                        <Th as="td" td>
                                            {item.visibility}
                                        </Th>
                                        <Th as="td" td>
                                            {item.code}
                                        </Th>
                                        <Th as="td" td>
                                            {item.name}
                                        </Th>
                                        <Th as="td" td>
                                            {item.type}
                                        </Th>
                                        <Th as="td" td>
                                            {item.time_period} Months
                                        </Th>
                                        <Th as="td" td>
                                            Rp. {item.price}
                                        </Th>
                                        <Th as="td" td>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <Link
                                                    to={`/test-components/${item._id}`}
                                                >
                                                    <button>Show</button>
                                                </Link>
                                                <UpdateProduct id={item._id} />
                                                <DeleteProduct id={item._id} />
                                                {/* <ShowProduct id={item._id} /> */}
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

export default DataProduct;
