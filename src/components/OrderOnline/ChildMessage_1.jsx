import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFollowUp, fetchShowOrders } from '../../store/actions';
import WhattsapMessage from './WhattsapMessage';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function ChildMessage_1(props) {
  const { id, toggle, orders, followup } = props;
  const dispatch = useDispatch();

  console.log(followup, 'ini follow up');

  const OrdersFilter =
    orders !== undefined &&
    orders.data.filter((item) => {
      return item._id === id;
    });
  console.log(OrdersFilter, 'order teh eusina naon');
  const order = OrdersFilter[0];
  // --- taruh di setiap child message --- //
  const template =
    followup !== null &&
    followup.data.filter(function (item) {
      return item.name === 'FollowUp_1';
    });

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
        message={template[0].template}
      />
    </>
  );
}
