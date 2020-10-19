import React from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';
import CardGetData from '../../elements/Card/CardGetData';
import DataOrder from '../../components/OrderOnline/DataOrder';

const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;
const Section = Styled.section`
    margin: 50px;
`;
export default function Order() {
    const order = useSelector((state) => state.orders.getOrders);

    return (
        <Section>
            {order === null ? (
                <Wraps>
                    <CardGetData
                        icon={faShoppingCart}
                        number="0"
                        text="Total Orders"
                    ></CardGetData>

                    <CardGetData
                        icon={faWallet}
                        number="2"
                        text="Total Paid"
                    ></CardGetData>

                    <CardGetData
                        icon={faShoppingCart}
                        number="0"
                        text="Total Income"
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
                        number={order.data.length}
                        text="Total Orders"
                    ></CardGetData>

                    <CardGetData
                        icon={faWallet}
                        number="2"
                        text="Total Paid"
                    ></CardGetData>

                    <CardGetData
                        icon={faShoppingCart}
                        number="0"
                        text="Total Income"
                    ></CardGetData>

                    <CardGetData
                        icon={faShoppingCart}
                        number="0"
                        text="Unpaid Orders"
                    ></CardGetData>
                </Wraps>
            )}
            <DataOrder />
        </Section>
    );
}
