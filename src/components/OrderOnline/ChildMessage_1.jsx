import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowOrders } from '../../store/actions';
import WhattsapMessage from './WhattsapMessage';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default function ChildMessage_1(props) {
    const { id, toggle } = props;
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.detailOrders);
    console.log(orders, 'orders id');
    useEffect(() => {
        dispatch(fetchShowOrders(id));
        // eslint-disable-next-line
    }, [dispatch, id]);
    return (
        <>
            {orders === null ? (
                <div>
                    <div>
                        <label>
                            <Span>Nama : Loading...</Span>
                        </label>
                    </div>
                    <label>
                        <Span>Nomor Telephone</Span>
                    </label>
                    <Input
                        disabled
                        style={{ width: '100%' }}
                        type="text"
                        name="number"
                        defaultValue="Loading..."
                    />
                    <label>
                        <Span>Message</Span>
                    </label>
                    <Input
                        disabled
                        style={{ width: '100%' }}
                        as="textarea"
                        rows="10"
                        name="message"
                        defaultValue={'Loading...'}
                    />
                    <ModalFooter>
                        <Button
                            color="secondary"
                            color="white"
                            style={{ border: '1px solid gray' }}
                        >
                            Cancel
                        </Button>{' '}
                        <Button color="primary" disabled>
                            Follow Up
                        </Button>{' '}
                    </ModalFooter>
                </div>
            ) : (
                <WhattsapMessage
                    toggle={toggle}
                    name={orders.data.user_info.name}
                    number={orders.data.user_info.phone_number}
                    message={`Selamat datang di Laruno ${
                        orders.data.user_info.name
                    }  ☺️

Kami sudah terima pesanan anda dengan rincian sebagai berikut,
Produk: ${orders.data.items.map((item) => {
                        return item.product_info.name;
                    })}
Harga: Rp197.000
Ongkir: Rp19.000
Total: Rp265.677
Metode Pembayaran: Transfer Bank

Silahkan Transfer senilai total_price ke Rekening atas Nama CV. Pelatihan Indonesia Sukses : BCA 88 3131 0006 atau BNI 88 3131 0000. 

Terimakasih.
`}
                />
            )}
        </>
    );
}
