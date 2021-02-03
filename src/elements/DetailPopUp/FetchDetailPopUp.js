import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderPaymentDetail } from '../../store/actions';
import moment from 'moment';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import CircularProgress from '@material-ui/core/CircularProgress';
import Styled from 'styled-components';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from 'reactstrap';
import DetailDataOrders from './DetailDataOrders';
const Icon = Styled.div`
margin-bottom: 10px;
`;
export default function FetchDetailPopUp(props) {
  const { id, toggle, orders, followup } = props;
  const dispatch = useDispatch();

  const template = followup.data.filter(function (item) {
    return item.name === 'DetailOrders';
  });
  const OrdersFilter = orders.data.filter((item) => {
    return item._id === id;
  });
  //

  const Orders = OrdersFilter[0];
  const Message = template[0].template;
  console.log(
    { orders, followup, OrdersFilter, template, Orders, Message },
    'orders filter'
  );

  useEffect(() => {
    dispatch(fetchOrderPaymentDetail(Object.keys(Orders.payment).length === 0 ? 0 : Orders.payment.method._id));
    // eslint-disable-next-line
  },[]);
  
  const paymentDetail = useSelector((state) => state.orders.detailPayment);

  return (
    <>
      <DetailDataOrders
        orders={Orders}
        toggle={toggle}
        //
        name={Orders.user_info.name}
        phone_number={Orders.user_info.phone_number}
        total_price={Orders.total_price}
        total_qty={Orders.total_qty}
        // payment_method={orders.data.payment.method.name}
        // address={orders.data.shipment.shipment_info.to.address.address1}
        invoice={Orders.invoice}
        email={Orders.user_info.email}
        message={Message}
        payment={paymentDetail}
      />
    </>
  );
}
