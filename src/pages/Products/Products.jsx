import React from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

// --- Elements, Pages, Components --- //
import CardGetData from '../../elements/Card/CardGetData';
import DataProduct from '../../components/Product/DataProduct';
import ImageBonus from '../../components/AddProduct/imageBonus';
import Image from '../../components/AddProduct/image';
// import ReactQuill from '../../components/AddProduct/ReactQuill';
// --- Styled Components --- //
const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;

export default function Products() {
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
            <Image />
            {/* <ImageBonus /> */}
            {/* <ReactQuill /> */}
            {/* <DaTest /> */}
            {/* <DataProductTest /> */}
        </section>
    );
}
