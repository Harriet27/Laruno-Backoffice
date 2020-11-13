import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetFollowUp, fetchShowOrders } from '../../store/actions';
import WhattsapMessage from './WhattsapMessage';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function ChildMessage_1(props) {
  const { id, toggle } = props;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.detailOrders);
  const followup = useSelector((state) => state.followup.getFollowUp);
  console.log(followup, 'ini follow up');
  console.log(orders, 'ini orders by id');

  useEffect(() => {
    dispatch(fetchShowOrders(id));
    // eslint-disable-next-line
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchGetFollowUp(id));
    // eslint-disable-next-line
  }, [dispatch]);

  // --- taruh di setiap child message --- //
  const template =
    followup !== null &&
    followup.data.filter(function (item) {
      return item.name === 'FollowUp_1';
    });

  return (
    <>
      {orders === null || orders.data._id !== id ? (
        <div>
          <div>
            <label>
              <Span>Nama : Loading...</Span>
            </label>
          </div>
          <label>
            <Span>Nomor Telephone</Span>
          </label>
          <Input
            disabled
            style={{ width: '100%' }}
            type="text"
            name="number"
            defaultValue="Loading..."
          />
          <label>
            <Span>Message</Span>
          </label>
          <Input
            disabled
            style={{ width: '100%' }}
            as="textarea"
            rows="5"
            name="message"
            defaultValue={'Loading...'}
          />
          <ModalFooter>
            <Button
              color="secondary"
              color="white"
              style={{ border: '1px solid gray' }}
            >
              Cancel
            </Button>{' '}
            <Button color="primary" disabled>
              Follow Up
            </Button>{' '}
          </ModalFooter>
        </div>
      ) : (
        <WhattsapMessage
          toggle={toggle}
          name={orders.data.user_info.name}
          phone_number={orders.data.user_info.phone_number}
          total_price={orders.data.total_price}
          total_qty={orders.data.total_qty}
          // payment_method={orders.data.payment.method.name}
          invoice={orders.data.invoice}
          email={orders.data.user_info.email}
          message={template[0].template}
        />
      )}
    </>
  );
}
