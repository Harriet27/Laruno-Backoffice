import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowOrders, fetchGetFollowUp } from '../../store/actions';
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
  const { id, toggle, orders } = props;
  const dispatch = useDispatch();
  // const orders = useSelector((state) => state.orders.detailOrders);
  const followup = useSelector((state) => state.followup.getFollowUp);
  // console.log('ORDER ID DIDALAM DETAIL', { orders, followup });
  // useEffect(() => {
  //   dispatch(fetchShowOrders(id));
  //   // eslint-disable-next-line
  // }, [dispatch, id]);
  useEffect(() => {
    dispatch(fetchGetFollowUp());
    // eslint-disable-next-line
  }, [dispatch]);

  const template =
    followup !== null &&
    followup.data.filter(function (item) {
      return item.name === 'DetailOrders';
    });
  const Message = template === false ? 'hehhe' : template[0].template;
  console.log(Message, 'ini message');
  return (
    <>
      {orders === null ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30em',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <DetailDataOrders
          orders={orders}
          toggle={toggle}
          //
          name={orders.user_info.name}
          phone_number={orders.user_info.phone_number}
          total_price={orders.total_price}
          total_qty={orders.total_qty}
          // payment_method={orders.data.payment.method.name}
          // address={orders.data.shipment.shipment_info.to.address.address1}
          invoice={orders.invoice}
          email={orders.user_info.email}
          message={Message}
        />
      )}
    </>
  );
}

// --- Modal Pop UP --- //
