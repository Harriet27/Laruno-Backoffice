import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import Card from '../../elements/Card/Card';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

// --- Elements, Pages, Components --- //
import { fetchGetProduct } from '../../store/actions';
import DeleteProduct from './DeleteProduct';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
// --- Styled Components --- //

const [sm, md, lg] = ['16px', '18px', '20px'];

const Th = Styled.th`
    font-size:  ${(props) => (props.td ? `${sm}` : `${md}`)};
    font-weight: ${(props) => (props.td ? 'normal' : '600')};
    text-align: left;
`;
const Input = Styled.input`
    padding: .375rem;
    font-size: 14px;
    font-weight: normal;
    color: #495057;
    border-radius: 3px;
    background-color: #FCFCFC;
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
`;
const ButtonLink = Styled.button`
    background-color:#0098DA;
    padding: 5px;
    border-radius: 3px;
    color: white;
    font-size: ${md};
    border: 1px solid #ced4da;
    font-Weight: 400;
`;

const DataProduct = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.getProduct);
    console.log(product, 'data product for pages product');
    // --- useEffect --- Get Data Topic ---//
    useEffect(() => {
        dispatch(fetchGetProduct());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* --- section 1 --- Button Action link to Add Product ---*/}
            <div
                style={{
                    margin: '20px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Link to={`/add-product`}>
                    <ButtonLink>Add Product</ButtonLink>
                </Link>

                <div>
                    <label>Search</label> <Input type="search" />
                </div>
            </div>

            {/* --- section 2 --- Get Data Product --- */}
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
                        {product !== null &&
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
                                            Rp. {FormatNumber(item.price)}
                                        </Th>
                                        <Th as="td" td>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                <Link
                                                    to={`/product/show/${item._id}`}
                                                >
                                                    <ButtonLink>
                                                        Show
                                                    </ButtonLink>
                                                </Link>
                                                <Link
                                                    to={`/product/update/${item._id}`}
                                                >
                                                    <ButtonLink>
                                                        Update
                                                    </ButtonLink>
                                                </Link>
                                                <DeleteProduct id={item._id} />
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
