import React, { useEffect } from 'react';
import Card from '../../elements/Card/Card';

import { fetchShowOrders } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Table } from 'reactstrap';

export default function DetailOrder(props) {
    const dispatch = useDispatch();
    let { id } = useParams();
    // const orders = useSelector((state) => state.detail.data);
    const orders = useSelector((state) => state.orders.detailOrders);
    // console.log(orders, 'data show orders for pages topic');
    console.log(orders, 'testing again');
    // --- useEffect --- get data topic ---//
    useEffect(() => {
        dispatch(fetchShowOrders(id));

        // eslint-disable-next-line
    }, [dispatch]);

    return (
        <React.Fragment>
            <section style={{ margin: '100px 50px' }}>
                <Card>
                    {orders !== null && (
                        <div>
                            <Card isNormal style={{ padding: '10px' }}>
                                <Table borderless size="sm">
                                    <thead>
                                        <tr>
                                            <td style={{ width: '200px' }}>
                                                Name
                                            </td>
                                            <td>: - </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>status</td>
                                            <td>: {orders.data.status}</td>
                                        </tr>

                                        <tr>
                                            <td>Total Price</td>
                                            <td>
                                                : {orders.data.cart.total_price}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Costumer Name</td>
                                            <td>: Name</td>
                                        </tr>

                                        <tr>
                                            <td>Costumer Email</td>
                                            <td>: email</td>
                                        </tr>

                                        <tr>
                                            <td>Costumer Phone</td>
                                            <td>: Phone</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                    )}
                </Card>
            </section>
        </React.Fragment>
    );
}
