import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowOrders } from '../../store/actions';
import moment from 'moment';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import Styled from 'styled-components';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
} from 'reactstrap';
const Icon = Styled.div`
margin-bottom: 10px;
`;
export default function FetchDetailPopUp(props) {
    const { id, toggle } = props;
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.detailOrders);
    console.log('ORDER ID DIDALAM DETAIL', orders);
    useEffect(() => {
        dispatch(fetchShowOrders(id));
        // eslint-disable-next-line
    }, [dispatch, id]);
    return (
        <>
            <DetailDataOrders orders={orders} toggle={toggle} />
        </>
    );
}

const DetailDataOrders = (props) => {
    const { orders, toggle } = props;
    return (
        <>
            <ModalBody>
                {orders === null ? (
                    'Loading...'
                ) : (
                    <section style={Styles.Container}>
                        {/* container one */}
                        <div style={Styles.FlexRow}>
                            {/* section one */}
                            <div style={Styles.SectionOne}>
                                <div style={Styles.Name}>
                                    {orders.data.user_info.name}
                                </div>
                                <Icon>
                                    <i
                                        style={Styles.Icon}
                                        className="fa fa-envelope"
                                    ></i>
                                    {orders.data.user_info.email}
                                </Icon>
                                <Icon>
                                    <i
                                        className="fa fa-phone"
                                        style={Styles.Icon}
                                    ></i>{' '}
                                    {orders.data.user_info.phone_number}
                                </Icon>
                                <Icon>
                                    <i
                                        style={Styles.Icon}
                                        className="fa fa-home"
                                    ></i>
                                    Jl.paseban timur X no. 11 rt.016 rw.03
                                    Senen, Kota Jakarta Pusat, DKI Jakarta,
                                    10460
                                </Icon>
                            </div>
                            {/* Section two */}
                            <div style={Styles.SectionTwo}>
                                <div>
                                    <h4>INVOICE #26636133</h4>
                                </div>
                                <div>
                                    Order Date:{' '}
                                    {moment(orders.data.create_date).format(
                                        'DD-MM-YYYY'
                                    )}
                                </div>
                                <>
                                    {orders.data.payment.status ===
                                    'COMPLETED' ? (
                                        <div style={Styles.Paid}>Paid</div>
                                    ) : (
                                        <div style={Styles.Unpaid}>Unpaid</div>
                                    )}
                                </>
                            </div>
                        </div>

                        {/* container two */}
                        <>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Items</th>
                                        <th style={{ width: '10%' }}>
                                            Quantity
                                        </th>
                                        <th style={{ width: '10%' }}>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.data.items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {index + 1}.{' '}
                                                    {item.product_info.name}
                                                </td>
                                                <td>{item.quantity} items</td>
                                                <td>
                                                    Rp.
                                                    {FormatNumber(
                                                        item.sub_price
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>total</th>
                                        <th>{orders.data.total_qty} items</th>
                                        <th>
                                            Rp.
                                            {FormatNumber(
                                                orders.data.total_price
                                            )}
                                        </th>
                                    </tr>
                                </tfoot>
                            </Table>
                        </>
                    </section>
                )}
            </ModalBody>
            <ModalFooter>
                <Button
                    color="white"
                    style={Styles.ButtonFotter}
                    onClick={toggle}
                >
                    Cancel
                </Button>
                <Button color="primary" onClick={toggle}>
                    Confirm
                </Button>
            </ModalFooter>
        </>
    );
};

const Styles = {
    Container: {
        margin: '40px 30px',
    },
    ButtonFotter: {
        border: '1px solid gray',
    },
    FlexRow: { display: 'flex', flexDirection: 'row', marginBottom: '30px' },
    Name: {
        marginBottom: '15px',
        fontSize: '18px',
        fontWeight: '500',
    },
    SectionOne: { width: '40%', marginTop: '70px' },
    SectionTwo: {
        width: '60%',
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    Paid: {
        color: '#5b841b',
        border: '3px solid #c6e1c6',
        width: '20%',
        textAlign: 'center',
        fontWeight: 700,
        marginTop: '10px',
    },
    Unpaid: {
        color: '#777',
        border: '3px solid #e5e5e5',
        width: '20%',
        textAlign: 'center',
        fontWeight: 700,
        marginTop: '10px',
        backgroundColor: '#efefef',
    },
    Icon: {
        marginRight: '10px',
    },
};
