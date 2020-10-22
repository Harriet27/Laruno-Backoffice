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
const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;

// --- styled components --- //
export default function Topic() {
    const topic = useSelector((state) => state.topic.getTopic);

    return (
        <Section>
            {topic === null ? (
                <Wraps>
                    <CardGetData
                        icon={faShoppingCart}
                        number="0"
                        text="Total Topics"
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
                        number={topic.data.length}
                        text="Total Topic"
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
            <DataTopic />
        </Section>
    );
}
