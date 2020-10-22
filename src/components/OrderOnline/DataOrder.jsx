import React, { useEffect } from 'react';
import { Table } from 'reactstrap';
import Styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetOrders } from '../../store/actions';
import { FakeOrder } from '../FakeData/FakeOrder';
import DehazeIcon from '@material-ui/icons/Dehaze';

import { Input, Th, lg, Overflow } from '../../elements/Styled/StyledForm';

import FollowUp from './FollowUp';
import FollowUp_1 from './FollowUp_1';
import FollowUp_2 from './FollowUp_2';
import FollowUp_3 from './FollowUp_3';
import FollowUp_4 from './FollowUp_4';
import Card from '../../elements/Card/Card';
import InputOrder from './InputOrder';
// --- Styled Components --- //

const SectionOne = Styled.div`
    margin: ${lg} 0;
    display: flex;
    justify-content: space-between;
`;

// --- Batas --- //

const DataOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.getOrders);

    // --- useEffect --- Get Data orders ---//
    useEffect(() => {
        dispatch(fetchGetOrders());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* --- section 1 --- Add New Orders and Search Orders --- */}
            <SectionOne>
                {/* <AddNewOrders /> */}
                <InputOrder />

                <div>
                    <label>Search</label> <Input type="search" />
                </div>
            </SectionOne>

            {/* --- section 2 --- Table Get Data Product In Table --- */}
            <Card isNormal>
                <Overflow>
                    {orders === null ? (
                        <React.Fragment>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>
                                            <DehazeIcon />
                                        </Th>
                                        <Th>Invoice Number</Th>
                                        <Th>Tag</Th>
                                        <Th>Orders Date</Th>
                                        <Th>Costumer Name</Th>
                                        <Th>Costumer Phone</Th>
                                        <Th>Product</Th>
                                        <Th>Total Price</Th>
                                        <Th>Payment Status</Th>
                                        <Th>Paid At</Th>
                                        <Th style={{ width: '100px' }}>
                                            Follow Up
                                        </Th>
                                        <Th style={{ width: '100px' }}>
                                            Actions
                                        </Th>
                                    </tr>
                                </thead>
                            </Table>
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '100px',
                                }}
                            >
                                Loading ...
                            </div>
                        </React.Fragment>
                    ) : orders.data.length >= 0 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <Th>
                                        <Input checkbox type="checkbox" />
                                    </Th>
                                    <Th>Invoice Number</Th>
                                    <Th>Tag</Th>
                                    <Th>Orders Date</Th>
                                    <Th>Costumer Name</Th>
                                    <Th>Costumer Phone</Th>
                                    <Th>Product</Th>
                                    <Th>Total Price</Th>
                                    <Th>Payment Status</Th>
                                    <Th>Paid At</Th>
                                    <Th style={{ width: '100px' }}>
                                        Follow Up
                                    </Th>
                                    <Th style={{ width: '100px' }}>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {orders.data.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <Th>
                                                <Input
                                                    checkbox
                                                    type="checkbox"
                                                    id={item._id}
                                                    value={item._id}
                                                    // onChange={handleCheckboxChange}
                                                />
                                            </Th>
                                            <Th as="td" td>
                                                {item.invoice_id}
                                            </Th>
                                            <Th as="td" td>
                                                -
                                            </Th>
                                            <Th as="td" td>
                                                {moment(item.created_at).format(
                                                    'MMMM Do YYYY, h:mm:ss a'
                                                )}
                                            </Th>
                                            <Th as="td" td>
                                                -
                                            </Th>
                                            <Th as="td" td>
                                                -
                                            </Th>
                                            <Th as="td" td>
                                                {item.cart.items.map((user) => {
                                                    return (
                                                        <React.Fragment
                                                            key={item._id}
                                                        >
                                                            {user.item.name}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </Th>
                                            <Th as="td" td>
                                                Rp.{' '}
                                                {FormatNumber(
                                                    item.cart.total_price
                                                )}
                                            </Th>
                                            <Th as="td" td>
                                                {item.status}
                                            </Th>
                                            <Th as="td" td>
                                                -
                                            </Th>
                                            <Th as="td" td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    <FollowUp />
                                                </div>
                                            </Th>
                                            <Th as="td" td>
                                                <Link
                                                    to={`/order/detail/${item._id}`}
                                                >
                                                    <ButtonLink>
                                                        detail
                                                    </ButtonLink>
                                                </Link>
                                            </Th>
                                        </tr>
                                    );
                                })} */}

                                {/* test fake data */}
                                {FakeOrder.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <Th>
                                                <Input
                                                    checkbox
                                                    type="checkbox"
                                                    id={item.id}
                                                    value={item.id}
                                                    // onChange={handleCheckboxChange}
                                                />
                                            </Th>
                                            <Th as="td" td>
                                                {item.invoice_number}
                                            </Th>
                                            <Th as="td" td>
                                                {item.tag}
                                            </Th>
                                            <Th as="td" td>
                                                {item.order_date}
                                            </Th>
                                            <Th as="td" td>
                                                {item.costumer_name}
                                            </Th>
                                            <Th as="td" td>
                                                {item.costumer_phone}
                                            </Th>
                                            <Th as="td" td>
                                                {item.product}
                                            </Th>
                                            <Th as="td" td>
                                                Rp.{item.total_price}
                                            </Th>
                                            <Th as="td" td>
                                                {item.payment_status}
                                            </Th>
                                            <Th as="td" td>
                                                {item.paid_at}
                                            </Th>
                                            <Th as="td" td>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <FollowUp />
                                                    <FollowUp_1 />
                                                    <FollowUp_2 />
                                                    <FollowUp_3 />
                                                    <FollowUp_4 />
                                                </div>
                                            </Th>
                                            <Th as="td" td>
                                                {/* <Link
                                                    to={`/order/detail/${item._id}`}
                                                >
                                                    <ButtonLink>
                                                        detail
                                                    </ButtonLink>
                                                </Link> */}
                                                -
                                            </Th>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <React.Fragment>
                            <Table>
                                <thead>
                                    <tr>
                                        <Th>
                                            <DehazeIcon />
                                        </Th>
                                        <Th>Invoice Number</Th>
                                        <Th>Tag</Th>
                                        <Th>Orders Date</Th>
                                        <Th>Costumer Name</Th>
                                        <Th>Costumer Phone</Th>
                                        <Th>Product</Th>
                                        <Th>Total Price</Th>
                                        <Th>Payment Status</Th>
                                        <Th>Paid At</Th>
                                        <Th>Follow Up</Th>
                                        <Th>Actions</Th>
                                    </tr>
                                </thead>
                            </Table>
                            <div
                                style={{
                                    textAlign: 'center',
                                    padding: '100px',
                                }}
                            >
                                You have no orders in this date range.
                            </div>
                        </React.Fragment>
                    )}
                </Overflow>
            </Card>
        </React.Fragment>
    );
};

export default DataOrders;
