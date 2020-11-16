import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFollowUp, fetchShowOrders } from '../../store/actions';
import WhattsapMessage from './WhattsapMessage';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function ChildMessage_1(props) {
  const { id, toggle, orders } = props;
  const dispatch = useDispatch();
  // const orders = useSelector((state) => state.orders.detailOrders);
  const followup = useSelector((state) => state.followup.getFollowUp);
  console.log(followup, 'ini follow up');

  // useEffect(() => {
  //   dispatch(fetchShowOrders(id));
  //   // eslint-disable-next-line
  // }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchGetFollowUp(id));
    // eslint-disable-next-line
  }, [dispatch]);

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
      return item.name === 'FollowUp_4';
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
