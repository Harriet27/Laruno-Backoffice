import React from 'react';
import DataCoupons from '../../components/Coupons/DataCoupons';
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
export default function Coupons() {
    const coupons = useSelector((state) => state.coupons.getCoupons);
    // function checkTransfer(item) {
    //     return item.payment_method === 'TRANSFER';
    // }

    // --- Test Untuk mengetahui jumlah yang menggunakan transfer --- //
    var newArray =
        coupons !== null &&
        coupons.data.filter(function (el) {
            return el.payment_method === 'TRANSFER';
        });
    console.log(newArray, 'NEWaRRAY');
    return (
        <Section>
            {coupons === null ? (
                <Wraps>
                    <CardGetData
                        icon={faShoppingCart}
                        number="0"
                        text="Total Coupons"
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
                        number={coupons.data.length}
                        text="Total Coupons"
                    ></CardGetData>

                    <CardGetData
                        icon={faWallet}
                        number={newArray.length}
                        text="Transfer"
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
            <DataCoupons />
        </Section>
    );
}
