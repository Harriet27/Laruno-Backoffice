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
  const { id, toggle } = props;
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.detailOrders);
  const followup = useSelector((state) => state.followup.getFollowUp);
  console.log('ORDER ID DIDALAM DETAIL', { orders, followup });
  useEffect(() => {
    dispatch(fetchShowOrders(id));
    // eslint-disable-next-line
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(fetchGetFollowUp());
    // eslint-disable-next-line
  }, [dispatch]);

  const template =
    followup !== null &&
    followup.data.filter(function (item) {
      return item.name === 'DetailOrders';
    });
  return (
    <>
      {orders === null || orders.data._id !== id ? (
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

// --- Modal Pop UP --- //
