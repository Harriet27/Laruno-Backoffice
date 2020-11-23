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
  const { topic, contents } = props;

  const filterContentsByid = (id, isLogic) => {
    const filterCouponsByID =
      contents !== null &&
      contents.data.filter((item) => {
        return (
          item.topic !== null &&
          item.isBlog === isLogic &&
          item.topic.some((items) => {
            return items._id == id;
          })
        );
      });

    return filterCouponsByID.length;
  };
  let total_Fulfillment = 0;
  let total_blog = 0;
  const callBackFilterContents =
    topic !== null &&
    topic.data.map((item) => {
      return (
        <>
          {(total_Fulfillment += filterContentsByid(item._id, false))}
          {(total_blog += filterContentsByid(item._id, true))}
        </>
      );
    });

  console.log({ callBackFilterContents, total_Fulfillment });

  return (
    <>
      <Wraps>
        <CardGetData
          icon={faShoppingCart}
          number={topic === null ? '0' : topic.data.length}
          text="Total Topic"
        ></CardGetData>

        <CardGetData
          icon={faWallet}
          number={total_blog || 0}
          text="Use Blog"
        ></CardGetData>

        <CardGetData
          icon={faShoppingCart}
          number={total_Fulfillment || 0}
          text="Use Fulfillment"
        ></CardGetData>

        <CardGetData
          icon={faShoppingCart}
          number="0"
          text="Unpaid Orders"
        ></CardGetData>
      </Wraps>
    </>
  );
}
