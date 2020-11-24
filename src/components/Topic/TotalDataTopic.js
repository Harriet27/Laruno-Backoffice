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

  let total_Fulfillment = 0;
  let total_blog = 0;
  let total_product = 0;

  const FilterContentsSomeTopic = (id, isLogic) => {
    return (
      data.contents !== null &&
      data.contents.data.filter((item) => {
        return (
          item.topic !== null &&
          item.isBlog === isLogic &&
          item.topic.some((items) => {
            return items._id === id;
          })
        );
      })
    );
  };

  const filterProductSomeTopic = (id) => {
    return (
      data.product !== null &&
      data.product.data.filter((item) => {
        return (
          item.topic !== null &&
          item.topic.some((items) => {
            return items._id == id;
          })
        );
      })
    );
  };

  const filterContentsByid = (id, isLogic) => {
    return FilterContentsSomeTopic(id, isLogic).length;
  };
  const filterProductByid = (id) => {
    return filterProductSomeTopic(id).length;
  };
  const callBackFilterContents =
    data.topic !== null &&
    data.topic.data.map((item) => {
      return (
        <>
          {(total_Fulfillment += filterContentsByid(item._id, false))}
          {(total_blog += filterContentsByid(item._id, true))}
          {(total_product += filterProductByid(item._id))}
        </>
      );
    });

  // const filterProduct
  return (
    <>
      <Wraps>
        <CardGetData
          icon={faShoppingCart}
          number={data.topic === null ? '0' : data.topic.data.length}
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
          number={total_product || 0}
          text="Use Product"
        ></CardGetData>
      </Wraps>
    </>
  );
}
