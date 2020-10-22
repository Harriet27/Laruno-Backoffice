import React, { useState } from 'react';
import ModalSmart from '../../elements/Modal/ModalSmart';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Tooltip } from 'reactstrap';
import { Input } from '../../elements/Styled/StyledForm';
// --- Styled Components --- //

export default function FollowUp(props) {
    const [form, setForm] = useState({
        number: '6281212408246',
        text:
            '' ||
            `Selamat datang di Toko kami Salvian Kumara ☺️

Kami sudah terima pesanan anda dengan rincian sebagai berikut,
Produk: Panci Elektrik
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
Atas Nama: Salvian Kumara`,
    });

    // const color = localStorage.getItem('color');
    function raiseInvoiceClicked() {
        // %0A INI UNTUK ENTER
        // %20 INI UNTUK SPACE
        // form.text = form.text.replace(/\s+/g, '%20');
        form.text = form.text.replace(/\n+/g, '%0A', /\s+/g, '%20');
        const url = `https://wa.me/${form.number}?text=${form.text}`;
        window.open(url, '_blank');
    }

    const handleChange = (e) => {
        let name = e.target.name;
        setForm({ ...form, [name]: e.target.value });
    };

    // --- test replace to persen --- //
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    return (
        <React.Fragment>
            <ModalSmart
                style={{
                    backgroundColor: 'white',
                    border: 'none',
                }}
                buttonLabel={
                    <i
                        style={{ background: 'white', color: '#d7d7da' }}
                        className="fa fa-comment fa-2x"
                        id="button-label-w"
                    >
                        <span
                            style={{
                                color: 'white',
                                position: 'relative',
                                top: '-6px',
                                left: '-18px',
                                fontSize: '14px',
                            }}
                        >
                            w
                        </span>
                    </i>
                }
                target_tooltip="w"
                tooltip={
                    <Tooltip
                        placement="top"
                        isOpen={tooltipOpen}
                        target="button-label-w"
                        toggle={toggleTooltip}
                    >
                        Welcome
                    </Tooltip>
                }
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
