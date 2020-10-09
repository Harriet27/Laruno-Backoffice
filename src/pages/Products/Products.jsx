import React from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import DaTest from '../../components/Product/FileStackTest';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProduct } from '../../store/actions';
// --- Elements, Pages, Components --- //
import CardGetData from '../../elements/Card/CardGetData';
import DataProduct from '../../components/Product/DataProduct';

// --- Styled Components --- //
const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;

export default function Products() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.getProduct);
    console.log(product, 'product di product menu');
    return (
        <section style={{ margin: '0 50px' }}>
            {product === null ? (
                <Wraps>
                    <CardGetData
                        icon={faShoppingCart}
                        number="0"
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
            ) : (
                <Wraps>
                    <CardGetData
                        icon={faShoppingCart}
                        number={product.data.length}
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
            )}
            {/* --- section 2 --- */}
            <DataProduct />
            {/* <DaTest /> */}
            {/* <DataProductTest /> */}
        </section>
    );
}
