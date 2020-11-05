import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Input } from '../../elements/Styled/StyledForm';
import { fetchShowOrders } from '../../store/actions';
export default function NewFollowUp() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const orders = useSelector((state) => state.orders.detailOrders);
    console.log(orders, 'orders isinya apa');

    useEffect(() => {
        dispatch(fetchShowOrders(id));

        // eslint-disable-next-line
    }, [dispatch, id]);

    const indo = orders !== null && orders.data.user_info.phone_number;
    const desc =
        orders !== null &&
        `Selamat datang di Toko kami ${orders.data.user_info.name} ☺️

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
Atas Nama: Salvian Kumara`;
    const [number, setNumber] = useState(indo);
    const [text, setText] = useState(desc);
    console.log(number, 'CEK NUMBER');
    console.log(text, 'isi text');
    // --- test --- //

    // const color = localStorage.getItem('color');
    function raiseInvoiceClicked() {
        // %0A INI UNTUK ENTER
        // %20 INI UNTUK SPACE
        // form.text = form.text.replace(/\s+/g, '%20');
        number = number.substring(0, 0) + '62' + number.substring(1);

        text = text.replace(/\n+/g, '%0A', /\s+/g, '%20');
        const url = `https://wa.me/${number}?text=${text}`;
        window.open(url, '_blank');
    }

    // const handleChange = (e) => {
    //     let name = e.target.name;
    //     setForm({ ...form, [name]: e.target.value });
    // };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Number </label>
                <Input
                    type="number"
                    name="number"
                    defaultValue={number}
                    // onChange={handleChange}
                />
                <label>Text</label>

                <Input
                    as="textarea"
                    rows="5"
                    name="text"
                    defaultValue={text}
                    // onChange={handleChange}
                />
                <button onClick={raiseInvoiceClicked}>On Whattsap</button>
            </div>
        </div>
    );
}
