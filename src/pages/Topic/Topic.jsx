import React from 'react';

import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
// --- Elements Page --- //
import CardGetData from '../../elements/Card/CardGetData';
import DataTopic from '../../components/Topic/DataTopic';
// --- Styled components --- //
const Section = Styled.section`
margin: 50px;
`;

// --- styled components --- //
export default function Topic() {
  return (
    <Section>
      <DataTopic />
    </Section>
  );
}
