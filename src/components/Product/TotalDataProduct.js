import React from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

// --- Elements, Pages, Components --- //
import CardGetData from '../../elements/Card/CardGetData';
import DataProduct from '../../components/Product/DataProduct';

// import ReactQuill from '../../components/AddProduct/ReactQuill';
// --- Styled Components --- //
const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;

export default function TotalDataProduct(props) {
  const { product } = props;
  return (
    <>
      <Wraps>
        <CardGetData
          icon={faShoppingCart}
          number={product === null ? 0 : product.data.length}
          text="Total Products"
        ></CardGetData>

        <CardGetData icon={faWallet} number="2" text="Total Paid"></CardGetData>

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
    </>
  );
}
