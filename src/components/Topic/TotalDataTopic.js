import React from 'react';

import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

// --- Elements Page --- //
import CardGetData from '../../elements/Card/CardGetData';
import DataTopic from '../../components/Topic/DataTopic';
// --- Styled components --- //
const Section = Styled.section`
margin: 50px;
`;
const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;

// --- styled components --- //
export default function TotalDataTopic(props) {
  const { data } = props;

  // const filterProduct
  return (
    <>
      <Wraps>
        <CardGetData
          icon={faShoppingCart}
          number={data.topic === null ? '0' : data.topic.data.length}
          text="Total Topic"
        ></CardGetData>

        <CardGetData icon={faWallet} number={0} text="Use Blog"></CardGetData>

        <CardGetData
          icon={faShoppingCart}
          number={0}
          text="Use Fulfillment"
        ></CardGetData>

        <CardGetData
          icon={faShoppingCart}
          number={0}
          text="Use Product"
        ></CardGetData>
      </Wraps>
    </>
  );
}
