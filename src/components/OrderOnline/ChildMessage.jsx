import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowOrders } from '../../store/actions';
import WhattsapMessage from './WhattsapMessage';
import { Span } from '../../elements/Styled/StyledTabs';
import { Input } from '../../elements/Styled/StyledForm';
export default function ChildMessage(props) {
    const { id } = props;
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
                    <button disabled>Follow Up</button>
                </div>
            ) : (
                <WhattsapMessage
                    name={orders.data.user_info.name}
                    number={orders.data.user_info.phone_number}
                    message={`Selamat datang di Toko kami ${
                        orders.data.user_info.name
                    }  ☺️

                    Kami sudah terima pesanan anda dengan rincian sebagai berikut,
                    Produk: ${orders.data.items.map((item) => {
                        return item.product_info.name;
                    })}
                    Harga: Rp197.000
                    Ongkir: Rp19.000
                    Total: Rp265.677

                    Dikirim ke:
                    Nama: Salvian Kumara
                    No HP: +6281310620752
                    Alamat: Jalan Janur Hijau 1 Blok Aa5 No 17
                    Kota: Kab. Tangerang
                    Kecamatan: Pagedangan

                    Silahkan transfer senilai Rp265.677, ke salah satu rekening dibawah ini:
                    BCA
                    No. Rek: 8015053824
                    Atas Nama: Salvian Kumara

                    CIMB Niaga
                    No. Rek: 700815470400
                    Atas Nama: Salvian Kumara

                    Danamon
                    No. Rek: 3626078921
                    Atas Nama: Salvian Kumara`}
                />
            )}
        </>
    );
}
