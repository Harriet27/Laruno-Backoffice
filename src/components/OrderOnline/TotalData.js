import React from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { fetchGetOrders } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import CardGetData from '../../elements/Card/CardGetData';

import FormatNumber from '../../elements/FormatNumber/FormatNumber';

const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;
export default function TotalData(props) {
  const { order } = props;
  console.log(order);
  let total = 0;
  let total_orders = (order !== null && order.data.length) || 0;
  let total_paid = 0;
  let total_unpaid = 0;
  order !== null &&
    order.data.map((item, index) => {
      return (
        <div key={item._id}>
          {(total += item.total_price)}
          {(total_paid += item.payment.status === 'COMPLETED')}
          {(total_unpaid += item.payment.status !== 'COMPLETED')}
        </div>
      );
    });

  return (
    <div>
      <Wraps>
        <CardGetData
          icon={faShoppingCart}
          number={total_orders}
          text="Total Orders"
        ></CardGetData>

        <CardGetData
          icon={faWallet}
          number={total_paid}
          text="Total Paid"
        ></CardGetData>

        <CardGetData
          icon={faShoppingCart}
          number={total_unpaid}
          text="Unpaid Orders"
        ></CardGetData>
        <CardGetData
          icon={faShoppingCart}
          number={`Rp ${FormatNumber(total)}`}
          text="Total Income"
        ></CardGetData>
      </Wraps>
    </div>
  );
}
