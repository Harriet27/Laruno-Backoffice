import React, { useState } from 'react';
import ModalSmart from '../../elements/Modal/ModalSmart';
import { Tooltip } from 'reactstrap';
import { Input } from '../../elements/Styled/StyledForm';
// --- Styled Components --- //

export default function FollowUp_3(props) {
    const [form, setForm] = useState({
        number: '6281212408246',
        text:
            '' ||
            `Selamat siang Salvian Kumara... Pesanan Panci Elektrik sudah siap kirim ya... ☺🙏🏻 `,
    });

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
                style={{ backgroundColor: 'white', border: 'none' }}
                buttonLabel={
                    <i
                        style={{ background: 'white', color: '#d7d7da' }}
                        className="fa fa-comment fa-2x"
                        id="button-label-3"
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
                            3
                        </span>
                    </i>
                }
                tooltip={
                    <Tooltip
                        placement="top"
                        isOpen={tooltipOpen}
                        target="button-label-3"
                        toggle={toggleTooltip}
                        autohide={false}
                    >
                        Follow-Up 3
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
