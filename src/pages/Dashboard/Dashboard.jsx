import React, { useEffect } from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import {
  fetchGetOrders,
  fetchGetProduct,
  fetchGetTopic,
  fetchGetUsersAdministrator,
} from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import CardGetData from '../../elements/Card/CardGetData';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';
import { CircularProgress } from '@material-ui/core';

const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;
const Section = Styled.section`
    margin: 50px;
`;
export default function Dashboard() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orders.getOrders);
  const product = useSelector((state) => state.product.getProduct);
  const topic = useSelector((state) => state.topic.getTopic);
  const User = useSelector((state) => state.user.userAdministrator);
  console.log({ topic, product, order }, 'order isi apa');
  useEffect(() => {
    dispatch(fetchGetOrders());
    dispatch(fetchGetProduct());
    dispatch(fetchGetTopic());
    dispatch(fetchGetUsersAdministrator());
    // eslint-disable-next-line
  }, [dispatch]);

  // --- code for total sum --- //
  // return (total += item.total_price);
  let total_estimate = 0;
  let total_orders = order !== null && order.data.length;
  let total_paid = 0;
  let total_unpaid = 0;
  let total_income = 0;

  order !== null &&
    order.data.map((item, index) => {
      return (
        <div key={item._id}>
          {(total_estimate += item.total_price)}
          {(total_paid += item.payment.status === 'COMPLETED')}
          {(total_unpaid += item.payment.status !== 'COMPLETED')}
          {item.payment.status === 'COMPLETED'
            ? (total_income += item.total_price)
            : 0}
        </div>
      );
    });
  console.log(total_orders);
  console.log(total_income, 'total income');
  return (
    <Section>
      {order === null ? (
        <Wraps>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '300px',
            }}
          >
            <CircularProgress />
          </div>
        </Wraps>
      ) : (
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
              number={`Rp ${FormatNumber(total_estimate)}`}
              text="
            Income estimate"
            ></CardGetData>
          </Wraps>
          <Wraps>
            <CardGetData
              icon={faShoppingCart}
              number={`Rp ${FormatNumber(total_income)}`}
              text="
            Total Income"
            ></CardGetData>
            <CardGetData
              icon={faShoppingCart}
              number={product.data.length}
              text="
            Total Product"
            ></CardGetData>
            <CardGetData
              icon={faShoppingCart}
              number={topic.data.length}
              text="
            Total Topic"
            ></CardGetData>
            <CardGetData
              icon={faShoppingCart}
              number={User.data.length}
              text="
            Total Users"
            ></CardGetData>
          </Wraps>
        </div>
      )}
    </Section>
  );
}
