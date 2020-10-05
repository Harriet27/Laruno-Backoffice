import React, { useState } from 'react';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { fetchDeleteProduct } from '../../store/actions';
import { useDispatch } from 'react-redux';
import Styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Input } from '../../elements/Styled/StyledForm';
// --- Styled Components --- //
const Section = Styled.section`
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
`;

export default function FollowUp(props) {
    const [form, setForm] = useState({
        number: '',
        text:
            '' ||
            `Halo Kak clara . Selamat datang di *Fiterus* ☺️
Kami sudah terima pesanan anda dengan rincian sebagai berikut,
Produk: Minyak Kelapa Murni VCO 250ml
Harga: Rp109.000
Ongkir: Rp9.000
Total: Rp118.564
        
Dikirim ke:
Nama: clara
No HP: +6285100261388
Alamat: duta garden f1 no 6
Kota: Kota Tangerang
Kecamatan: Benda
        
Silahkan transfer senilai Rp118.564, ke salah satu rekening dibawah ini:
BCA
No. Rek: 8015053824
Atas Nama: Salvian Kumara
        
CIMB Niaga
No. Rek: 700815470400
Atas Nama: Salvian Kumara
        
Danamon
No. Rek: 3626078921
Atas Nama: Salvian Kumara
        
Jika Kak clara sudah transfer, silahkan konfirmasi  https://fiterus.orderonline.id/payment-confirmation?order_id=18796037 `,
    });
    console.log(form, 'isinya apa');
    const dispatch = useDispatch();

    function raiseInvoiceClicked() {
        // %0A INI UNTUK ENTER
        // %20 INI UNTUK SPACE
        // form.text = form.text.replace(/\s+/g, '%20');
        form.text = form.text.replace(/\n+/g, '%0A', /\s+/g, '%20');
        const url = `https://wa.me/${form.number}?text=${form.text}`;
        window.open(url, '_blank');
        console.log(form.text);
    }
    const handleChange = (e) => {
        let name = e.target.name;
        setForm({ ...form, [name]: e.target.value });
    };

    // --- test replace to persen --- //

    return (
        <React.Fragment>
            <ModalSmart
                style={{ backgroundColor: 'green' }}
                buttonLabel={<CheckCircleOutlineIcon />}
                title="Follow Up"
                onClickConfirm={raiseInvoiceClicked}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Number</label>
                    <Input
                        type="number"
                        name="number"
                        value={form.number}
                        onChange={handleChange}
                    />
                    <label>Text</label>
                    <Input
                        as="textarea"
                        rows="5"
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                    />
                </div>
            </ModalSmart>
        </React.Fragment>
    );
}
