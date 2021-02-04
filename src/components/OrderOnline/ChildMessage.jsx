import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFollowUp, fetchShowOrders } from '../../store/actions';
import WhattsapMessage from './WhattsapMessage';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function ChildMessage_1(props) {
  const { id, toggle, orders, followup, number } = props;
  const dispatch = useDispatch();

  const OrdersFilter = orders.data.filter((item) => {
    return item._id === id;
  });
  // console.log({ orders, followup }, 'child message');

  // --- taruh di setiap child message --- //
  const template = followup.data.filter((item) => {
    return number === '1'
      ? item.name === 'FollowUp'
      : number === '2'
      ? item.name === 'FollowUp_1'
      : number === '3'
      ? item.name === 'FollowUp_2'
      : number === '4'
      ? item.name === 'FollowUp_3'
      : number === '5'
      ? item.name === 'FollowUp_4'
      : null;
  });
  const order = OrdersFilter[0];
  console.log('ChildMessage Modal form:', order);
  const Message = template[0].template;
  console.log({ order, Message }, 'child');
  return (
    <>
      <WhattsapMessage
        toggle={toggle}
        name={order.user_info.name}
        phone_number={order.user_info.phone_number}
        total_price={order.total_price}
        total_qty={order.total_qty}
        // payment_method={orders.data.payment.method.name}
        invoice={order.invoice}
        email={order.user_info.email}
        message={Message}
      />
    </>
  );
}
