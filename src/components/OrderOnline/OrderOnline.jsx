import React from 'react';
import Styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import CardGetData from '../../elements/Card/CardGetData';

import ModalSmart from '../../elements/Modal/ModalSmart';
import TableOrder from './TableOrder';

//  --- Styled Components --- //
const Wraps = Styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
`;
const Select = Styled.select`
    width: 100%;
    padding: .375rem;
    font-size: 14px;
    font-weight: 400;
    color: #495057;
    border-radius: 3px;
    background-color: #FCFCFC;
    border: 1px solid #ced4da;
    &:focus{
    outline: none !important;
    border:1px solid #66AFE9;
    }
    &:hover{
        box-shadow: 0px 1px 3px -1px rgba(96,96,96,0.75);
    }
`;
const WrapsTop = Styled.div`
margin-right:10px;
`;
//  --- Styled Components --- //

export default function OrderOnline() {
    return (
        <section style={{ margin: '0 50px' }}>
            {/* Section 1
            <div style={{ display: 'flex', margin: '20PX 0' }}>
                <WrapsTop>Orders</WrapsTop>
                <WrapsTop>
                    <Select name="product">
                        <option value="hoodie">Hoodie Face Shield</option>
                    </Select>
                </WrapsTop>
                <WrapsTop>
                    <Select type="select" name="product">
                        <option value="hoodie">Checkout pages</option>
                    </Select>
                </WrapsTop>
            </div> */}

            {/* Section 2 */}
            <Wraps>
                <CardGetData
                    icon={faShoppingCart}
                    number="2"
                    text="Total Orders"
                ></CardGetData>
                <CardGetData
                    icon={faWallet}
                    number="2"
                    text="Total Paid"
                ></CardGetData>
                <CardGetData
                    icon={faPercent}
                    number="7 %"
                    text="Paid Ratio"
                ></CardGetData>
                <CardGetData
                    icon={faShoppingCart}
                    number="0"
                    text="Unpaid Orders"
                ></CardGetData>
            </Wraps>

            {/* Section 3 */}

            <div
                style={{
                    display: 'flex',
                    margin: '20PX 0',
                    justifyContent: 'space-between',
                }}
            >
                <div style={{ display: 'flex' }}>
                    <WrapsTop>
                        {/* Sections Actions */}
                        <ModalSmart
                            onClickConfirm={() => {
                                return alert('succes');
                            }}
                            buttonLabel="Actions"
                        >
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '10px 0',
                                    }}
                                >
                                    <WrapsTop style={{ width: '45%' }}>
                                        <label>Product</label>
                                        <Select name="product">
                                            <option value="hoodie">
                                                Hoodie Face Shield
                                            </option>
                                        </Select>
                                    </WrapsTop>

                                    <WrapsTop style={{ width: '45%' }}>
                                        <label>Checkout Page</label>
                                        <Select name="product">
                                            <option value="hoodie">
                                                Hoodie Face Shield
                                            </option>
                                        </Select>
                                    </WrapsTop>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <WrapsTop style={{ width: '45%' }}>
                                        <label>Handled By</label>
                                        <Select name="product">
                                            <option value="hoodie">
                                                Hoodie Face Shield
                                            </option>
                                        </Select>
                                    </WrapsTop>
                                    <WrapsTop style={{ width: '45%' }}>
                                        <label>Contact</label>
                                        <Select name="product">
                                            <option value="hoodie">
                                                Hoodie Face Shield
                                            </option>
                                        </Select>
                                    </WrapsTop>
                                </div>
                            </div>
                        </ModalSmart>
                    </WrapsTop>

                    {/* Refund */}
                    <WrapsTop>
                        <Select name="Refund">
                            <option value="hoodie">
                                Select Pyament Status
                            </option>
                            <option value="hoodie">Paid</option>
                            <option value="hoodie">Unpaid</option>
                            <option value="hoodie">Refund</option>
                        </Select>
                    </WrapsTop>

                    {/*  */}
                    <WrapsTop>
                        <Select name="Select_Date">
                            <option value="hoodie">Today</option>
                            <option value="hoodie">Yesterday</option>
                            <option value="hoodie">Last 7 days</option>
                            <option value="hoodie">Last 30 days</option>
                        </Select>
                    </WrapsTop>

                    <WrapsTop>
                        <ModalSmart
                            style={{
                                backgroundColor: '#fcfcfc',
                                color: '#495057',
                            }}
                            buttonLabel="Upload Receipt Number"
                        />
                    </WrapsTop>
                </div>
                <div>
                    <WrapsTop>
                        <ModalSmart
                            style={{
                                backgroundColor: '#fcfcfc',
                                color: '#495057',
                            }}
                            buttonLabel="View More Status"
                        />
                    </WrapsTop>
                </div>
            </div>

            {/* section 4 */}
            <TableOrder />
        </section>
    );
}
