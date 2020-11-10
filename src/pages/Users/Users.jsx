import React from 'react';
import DataUsers from '../../components/Users/DataUsers';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import CardGetData from '../../elements/Card/CardGetData';
// --- Styled Components --- //
const Section = Styled.section`
    margin: 50px;
`;
const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;

export default function Users() {
  const User = useSelector((state) => state.user.userAdministrator);
  return (
    <Section>
      {User === null ? (
        <Wraps>
          <CardGetData
            icon={faShoppingCart}
            number="0"
            text="Total Administrator"
          ></CardGetData>

          <CardGetData
            icon={faWallet}
            number="2"
            text="Total Paid"
          ></CardGetData>

          <CardGetData
            icon={faShoppingCart}
            number="0"
            text="Unpaid Orders"
          ></CardGetData>

          <CardGetData
            icon={faShoppingCart}
            number="0"
            text="Unpaid Orders"
          ></CardGetData>
        </Wraps>
      ) : (
        <Wraps>
          <CardGetData
            icon={faShoppingCart}
            number={User.data.length}
            text="Total Administrator"
          ></CardGetData>

          <CardGetData
            icon={faWallet}
            number="2"
            text="Total Paid"
          ></CardGetData>

          <CardGetData
            icon={faShoppingCart}
            number="0"
            text="Unpaid Orders"
          ></CardGetData>

          <CardGetData
            icon={faShoppingCart}
            number="0"
            text="Unpaid Orders"
          ></CardGetData>
        </Wraps>
      )}
      <DataUsers />
    </Section>
  );
}
