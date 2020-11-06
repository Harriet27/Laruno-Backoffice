import React, { useEffect } from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { fetchGetOrders } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import CardGetData from '../../elements/Card/CardGetData';
import DataOrder from '../../components/OrderOnline/DataOrder';
import FormatNumber from '../../elements/FormatNumber/FormatNumber';

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
    const dispatch = useDispatch();
    const order = useSelector((state) => state.orders.getOrders);
    console.log(order, 'order isi apa');
    useEffect(() => {
        dispatch(fetchGetOrders());
        // eslint-disable-next-line
    }, [dispatch]);

    // --- code for total sum --- //
    // return (total += item.total_price);
    let total = 0;
    order !== null &&
        order.data.map((item, index) => {
            return (
                <>
                    {item.orders.map((items) => {
                        return (total += items.total_price);
                    })}
                </>
            );
        });
    console.log(total);
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
                        number="0"
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
                        number={`Rp ${FormatNumber(total)}`}
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
