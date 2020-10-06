import React from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

// --- Elements, Pages, Components --- //
import CardGetData from '../../elements/Card/CardGetData';
import DataProduct from '../../components/Product/DataProduct';
import DataProductTest from '../../components/Product/DataPrdouctTest';
// --- Styled Components --- //
const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;

export default function Products() {
    return (
        <section style={{ margin: '0 50px' }}>
            <Wraps>
                <CardGetData
                    icon={faShoppingCart}
                    number="2"
                    text="Total Products"
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
            {/* --- section 2 --- */}
            <DataProduct />
            {/* <DataProductTest /> */}
        </section>
    );
}
